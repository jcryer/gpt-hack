import * as tesseract from "node-tesseract-ocr";

const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
}

import pdftopic from "pdftopic";

async function pdfToImageBuffers(fileBuffer) {
  return await pdftopic.pdftobuffer(fileBuffer, "all");
}

async function pdfToText(fileBuffer) {
  const images = await pdfToImageBuffers(fileBuffer);
  let out = "";

  for (const image of images) {
    const text = await tesseract.recognize(image, config);
    out += `${text} \r\n`;
  }
  return out;
}

export { pdfToText };
