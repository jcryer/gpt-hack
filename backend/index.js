import Fastify from 'fastify';
import * as path from 'path';
import st from '@fastify/static';
import multipart from '@fastify/multipart';
import cors from '@fastify/cors'

import { fileURLToPath } from 'url';
import fs from "fs";
import { processBankStatement, processInvoice, matchInvoicesAndStatements, reconcilai } from './openai.js';
import { pdfToText } from './pdf.js';
import { processUploadedInvoice, processUploadedBankStat } from './process.js'
import { setup, createUser, createReceipt, createBankStatement } from './db.js';
import { defaultBankCallData, defaultReceiptData } from './defaultData.js';
import { pdftobuffer } from 'pdftopic';

(async () => {
  await setup();
  // const userId = await createUser("test");
})();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({ logger: true });
fastify.register(cors);

fastify.register(multipart);

fastify.register(st, {
  root: path.join(__dirname, 'build'),
  prefix: '/',
  decorateReply: false
});

fastify.register(st, {
  root: path.join(__dirname, 'files'),
  prefix: '/files/',
  decorateReply: false
});



// Reads in a local CSV file of bank statement, chunks it, sends each chunk to GPT in parallel, collates result
// and returns standardised JSON representation of bank statement.
fastify.get('/bankStatement', async function (req, res) {
  const bankFilePath = "data/CSV Jan 23.csv";
  const csv = await fs.promises.readFile(bankFilePath, { encoding: "utf-8" });
  const processed = await processBankStatement(csv);
  const bank = await createBankStatement(processed, 1); // Eventually pass userId
  return JSON.stringify(processed, null, 2);
});

// Reads in a local PDF file of invoice, converts it to an image, runs OCR to get all text.
fastify.get('/preInvoiceOCR', async function (req, res) {
  const invoiceFilePath = "data/RS614063.pdf";
  const buffer = await fs.promises.readFile(invoiceFilePath);
  return `${await pdfToText(buffer)}`;
});

// Reads in a local PDF file of invoice, converts it to an image, runs OCR to get all text.
// Then sends that description to GPT and returns standardised JSON representation of receipt.
fastify.get('/invoice', async function (req, res) {
  const invoiceFilePath = "data/215908-Telekinetix Limited.pdf";
  const buffer = await fs.promises.readFile(invoiceFilePath);
  const desc = await pdfToText(buffer);
  const processed = await processInvoice(desc);
  const receipt = await createReceipt(processed, 1, invoiceFilePath); // Eventually pass userId and original file path
  // need to save file with name of `receipt`
  return JSON.stringify(processed, null, 2);
});

fastify.get('/test', async function (req, res) {
  return JSON.stringify(await reconcilai(), null, 2);
});

fastify.post('/upload', async function (req, res) {
  const datas = req.files();
  let invoiceProms = [];
  let bank = Promise.resolve();

  for await (const part of datas) { // iterate the async generator
    req.log.info('storing %s', part.filename);
    if (part.filename.includes("pdf") || part.filename.includes("invoicesFiles")) {
      invoiceProms.push(processUploadedInvoice(part));
    } else if (part.filename.includes("csv") || part.filename.includes("statementsFile")) {
      bank = processUploadedBankStat(part);
    } else {
      return { error: `well thats not good: ${part.filename}` };
    }
  }

  invoiceProms = await Promise.all(invoiceProms);
  bank = await bank;

  let bank_copy = JSON.parse(JSON.stringify(bank));
  let invoiceIds = [];
  let invoices = [];
  let invoiceNames = [];
  for (let i = 0; i < invoiceProms.length; i++) {
    invoiceIds.push(invoiceProms[i].id);
    invoices.push(invoiceProms[i].processed);
    invoiceNames.push(invoiceProms[i].name);
  }
  const matches = await matchInvoicesAndStatements(bank, invoices, invoiceIds, invoiceNames);

  matches.matches.forEach((m) => {
    bank_copy[m.statementId].invoice = `inv_${m.invoiceId}.pdf`;
    bank_copy[m.statementId].invoiceName = m.invoiceName;
  });

  return { all: bank_copy, unmatched: matches.unmatched };
});

fastify.listen({ port: 25565, host: '78.129.209.146' }, function (err, address) {
  if (err) fastify.log.error(err);
});
