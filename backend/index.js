import Fastify from 'fastify';
import * as path from 'path';
import * as st from '@fastify/static';
import { fileURLToPath } from 'url';
import fs from "fs";
import { processBankStatement, processInvoice, testEmbedding } from './openai.js';
import { pdfToText } from './pdf.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({ logger: true });
fastify.register(st, {
  root: path.join(__dirname, 'build'),
  prefix: '/'
});

// Reads in a local CSV file of bank statement, chunks it, sends each chunk to GPT in parallel, collates result
// and returns standardised JSON representation of bank statement.
fastify.get('/bankStatement', async function(req, res) {
  const bankFilePath = "data/monzo.csv";
  const csv = await fs.promises.readFile(bankFilePath, { encoding: "utf-8" });
  return JSON.stringify(await processBankStatement(csv), null, 2);
});

// Reads in a local PDF file of invoice, converts it to an image, runs OCR to get all text.
fastify.get('/preInvoiceOCR', async function(req, res) {
  const invoiceFilePath = "data/RS614063.pdf";
  const buffer = await fs.promises.readFile(invoiceFilePath);
  return `${await pdfToText(buffer)}`;
});

// Reads in a local PDF file of invoice, converts it to an image, runs OCR to get all text.
// Then sends that description to GPT and returns standardised JSON representation of receipt.
fastify.get('/invoiceOCR', async function(req, res) {
  const invoiceFilePath = "data/215908-Telekinetix Limited.pdf";
  const buffer = await fs.promises.readFile(invoiceFilePath);
  const desc = await pdfToText(buffer);
  return JSON.stringify(await processInvoice(desc), null, 2);
});

fastify.get('/test', async function(req, res) {
  return JSON.stringify(await testEmbedding(), null, 2);
});

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) fastify.log.error(err);
});
