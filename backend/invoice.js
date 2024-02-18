import * as fs from "fs";
import { pdfToBase64 } from './pdf.js';

async function parseInvoice(filePath) {
  const buffers = await pdfToBase64(filePath);
  console.log("Bank Data\n:", JSON.stringify(bankData));
  console.log(buffers[0]);
  const pdfImg = buffers[0];

  response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        "role": "user",
        "content": [
          { "type": "text", "text": "This image is an invoice, find the most likely bank transaction that this invoice is associated with" },
          {
            "type": "image_url",
            "image_url": {
              "url": `data:image/jpeg;base64,${pdfImg}`,
            }
          }],
      },
      {
        "role": "system",
        "content": `You are an accounting bot. Here is some bank statement data in a json format. Use this information to match invoices to transactions. Data:\n${JSON.stringify(bankData)}`
      }
    ]
  });
  console.log(response.choices[0]);
  return {data: response};
}

export { parseInvoice };
