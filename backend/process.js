import { pdfToText } from "./pdf.js";
import { processInvoice, processBankStatement } from "./openai.js";
import { createReceipt, createBankStatement } from "./db.js";
import fs from "fs";

function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
      const _buf = [];
      stream.on("data", (chunk) => _buf.push(chunk));
      stream.on("end", () => resolve(Buffer.concat(_buf)));
      stream.on("error", (err) => reject(err));

  });
}


async function processUploadedInvoice(part) {
  const buffer = await streamToBuffer(part.file);
  const desc = await pdfToText(buffer);
  const processed = await processInvoice(desc);
  /*const processed = {
    totalAmount: 2220,
    description: 'Hosted servers inc Nova, Development Server, i.LEVEL Connect Server, Yumi Server Monthly Rental, Religion Server Monthly Rental, New B2B Server Monthly Rental',
    date: '2023-01-01',
    toFrom: 'i.LEVEL Limited',
    category: 'Hosting Services'
  }*/
  const receiptId = await createReceipt(processed, 1, part.filename);
  await fs.promises.writeFile(`files/inv_${receiptId}.pdf`, buffer);
  return { processed: processed, id: receiptId, name: part.filename };
}

async function processUploadedBankStat(part) {
  const buffer = await streamToBuffer(part.file);
  const processed = await processBankStatement(buffer.toString());
  const bankId = await createBankStatement(processed, 1); // Eventually pass userId
  await fs.promises.writeFile(`files/bank_${bankId}.csv`, buffer);
  return processed;
}

export { processUploadedInvoice, processUploadedBankStat };
