import * as pdfjs from 'pdfjs-dist';
import { createWorker } from 'tesseract.js';
import pdftopic from "pdftopic";

async function pdfToTextOcr(buffer) {
  const worker = await createWorker('eng');
  const pngPages = await pdftopic.pdftobuffer(buffer, "all");
  let out = "";

  for (const page of pngPages) {
    const ret = await worker.recognize(page);
    out += `${ret.data.text} \r\n`;
  }
  await worker.terminate();
  return out;
}

async function pdfToTextDirect(buffer) {
  const pdf = await pdfjs.getDocument({data: buffer}).promise;
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

export { pdfToTextOcr, pdfToTextDirect };
