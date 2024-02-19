import * as pdfjs from 'pdfjs-dist';
import { createWorker } from 'tesseract.js';
import pdftopic from "pdftopic";

async function pdfToImageBuffers(fileBuffer) {
  return await pdftopic.pdftobuffer(fileBuffer, "all");
}

async function pdfToText(fileBuffer) {
  const worker = await createWorker('eng');
  const images = await pdfToImageBuffers(fileBuffer);
  let out = "";

  for (const image of images) {
    const ret = await worker.recognize(image);
    out += `${ret.data.text} \r\n`;
  }
  await worker.terminate();
  return out;
}

export { pdfToText };
