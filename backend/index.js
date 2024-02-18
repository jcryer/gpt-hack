import Fastify from 'fastify';
import * as path from 'path';
import * as st from '@fastify/static';
import { fileURLToPath } from 'url';
import fs from "fs";
import { processBankStatement } from './openai.js';
import { parseInvoice } from './invoice.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({ logger: true });
fastify.register(st, {
  root: path.join(__dirname, 'build'),
  prefix: '/'
});

fastify.get('/test', function(req, res) {
  return { hello: 'world' };
});

fastify.get('/doIt', async function(req, res) {
  const bankFilePath = "data/CSV Jan 23.csv";
  const csv = await fs.promises.readFile(bankFilePath, { encoding: "utf-8" });

  const bankData = await processBankStatement(csv);
  return bankData;
  // const invFilePath = "data/Invoice TK01-38.pdf";
  // return await parseInvoice(invFilePath, bankData);
});

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) fastify.log.error(err);
});
