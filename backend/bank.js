import * as fs from "fs";
import OpenAI from 'openai';
import { PORTKEY_GATEWAY_URL, createHeaders } from 'portkey-ai'

function parseDoc(totalAmount, description, toFrom, category, date) {
  return { totalAmount, description, toFrom, category, date };
}

const tools = [{
  "type": "function",
  "function": {
    "name": "parseDoc",
    "description": "Extracts essential information from a bank statement, including total amount, category, description, and date.",
    "parameters": {
      "type": "object",
      "properties": {
        "total_amount": {
          "type": "array",
          "items": {
            "type": "number",
            "description": "A monetary amount, which can be positive or negative."
          },
          "description": "The total monetary amounts on the item. It can be + or -"
        },
        "description": {
          "type": "array",
          "items": {
            "type": "string",
            "description": "Textual description of the item."
          },
          "description": "A brief description or reference of what the item is for. Include any extra notes here."
        },
        "toFrom": {
          "type": "array",
          "items": {
            "type": "string",
            "description": "Recipient/Sender (To/From)"
          },
          "description": "Name of recipient/sender."
        },
        "category": {
          "type": "array",
          "items": {
            "type": "string",
            "description": "Category name."
          },
          "description": "A traditional accounting category/classification for the incoming, outgoing item"
        },
        "date": {
          "type": "array",
          "items": {
            "type": "string",
            "description": "Date in ISO 8601 format."
          },
          "description": "The dates when the items were issued, preferably in ISO 8601 format (YYYY-MM-DD)."
        }
      },
      "required": ["total_amount", "description", "to/from", "category", "date"]
    }
  }
}]

/*
const openai = new OpenAI({
  apiKey: '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', // defaults to process.env["OPENAI_API_KEY"],
  baseURL: PORTKEY_GATEWAY_URL,
  defaultHeaders: createHeaders({
    provider: "openai",
    apiKey: "ahhhh-2111d1" // defaults to process.env["PORTKEY_API_KEY"]
  })
});
*/
const openai = new OpenAI({
  apiKey: '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'
});

const chunkMaker = (arr, size) => arr.length > size ? [arr.slice(0, size), ...chunkMaker(arr.slice(size), size)] : [arr];

const doBankCall = false;
async function processBankStatement(filePath) {
  const file = await fs.promises.readFile(filePath, { encoding: "utf-8" });

  const chunks = chunkMaker(file.split('\n').slice(1), 20);

  let retData = {"total_amount":[-3000,-191.22,-180,-375.2,-100],"description":["BILL PAYMENT VIA FASTER PAYMENT TO MR JD CRYER REFERENCE SALARYDIV, MANDATE NO 0115 BANK TRANSFER DEBIT","DIRECT DEBIT PAYMENT TO AIMS REF 6589503250, MANDATE NO 0019 EXTERNAL DIRECT DEBIT","BILL PAYMENT VIA FASTER PAYMENT TO EIGER REFERENCE SAGELINK, MANDATE NO 47 BANK TRANSFER DEBIT","DIRECT DEBIT PAYMENT TO CREATIVE PENSION T REF CRTELEK01M1221228, MANDATE NO 0013 EXTERNAL DIRECT DEBIT","CARD PAYMENT TO PARCELBROKER ON 05-01-2023 OTT DEBIT"],"toFrom":["MR JD CRYER","AIMS","EIGER","CREATIVE PENSION T","PARCELBROKER"],"category":["Salary","Utilities","Bank Transfer","Pension","Shopping"],"date":["2023-01-01","2023-01-03","2023-01-03","2023-01-03","2023-01-06"]};
  if (doBankCall) {
    let response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        { "role": "user", "content": `${chunks[0].join('\n')}` },
        {
          "role": "system",
          "content": "You are an accounting bot designed to function call in order to parse bank statements. Parse the document data with the function. Ensure entries into arrays preserve order between inputs."
        }
      ],
      max_tokens: 4096,
      tools: tools
    });
    retData = JSON.parse(response.choices[0].message.tool_calls[0].function.arguments);
  }
  for (let i = 0; i < retData['total_amount'].length; i++) {
    console.log(parseDoc(retData["total_amount"][i], retData["description"][i], retData["toFrom"][i], retData["category"][i], retData["date"][i]));
  }
  return { data: retData };
}

export { processBankStatement };
