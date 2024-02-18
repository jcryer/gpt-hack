import * as pdfjs from 'pdfjs-dist';
import * as fs from "fs";
import { createWorker } from 'tesseract.js';
import pdftopic from "pdftopic";

async function pdfToImageBuffers(fileBuffer) {
  return await pdftopic.pdftobuffer(fileBuffer, "all");
}

async function pdfToBase64(fileBuffer) {
  const res = await pdfToImageBuffers(fileBuffer);
  return res.map(x => x.toString('base64'));
}

async function pdfToTextOcr(fileBuffer) {
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

async function pdfToTextDirect(buffer) {
  const pdf = await pdfjs.getDocument({data: buffer.buffer}).promise;
  let out = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    let textItems = content.items;
    let line = 0;
  
    for (let i = 0; i < textItems.length; i++) {
      if (line != textItems[i].transform[5]) {
        if (line != 0) {
          out +='\r\n';
        }
        line = textItems[i].transform[5];
      }
      out += textItems[i].str;
    }
  }
  return out;
}

export { pdfToBase64, pdfToTextOcr, pdfToTextDirect };
