import OpenAI from 'openai';
import 'dotenv/config';
import { defaultBankCallData } from './defaultData.js';

const openai = new OpenAI();

const chunkMaker = (arr, size) => arr.length > size ? [arr.slice(0, size), ...chunkMaker(arr.slice(size), size)] : [arr];

function parseBankStatementResponse(totalAmount, description, toFrom, category, date) {
  return { totalAmount, description, toFrom, category, date };
}

async function doBankStatementRequest(chunk) {
  return openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      { "role": "user", "content": `${chunk.join('\n')}` },
      {
        "role": "system",
        "content": "You are an accounting bot designed to function call in order to parse bank statements. Parse the document data with the function. Ensure entries into arrays preserve order between inputs."
      }
    ],
    max_tokens: 4096,
    tools: [{
      "type": "function",
      "function": {
        "name": "parseDoc",
        "description": "Extracts essential information from a bank statement, including total amount, category, description, and date.",
        "parameters": {
          "type": "object",
          "properties": {
            "totalAmount": {
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
          "required": ["totalAmount", "description", "toFrom", "category", "date"]
        }
      }
    }]
  });
}

async function processBankStatement(csv) {
  let statement = [];
  if (process.env.DEFAULT_DATA) return JSON.stringify(defaultBankCallData, null, 2);

  const chunks = chunkMaker(csv.split('\n').slice(1), 10);

  let promises = chunks.map(c => doBankStatementRequest(c));
  let promiseResults = await Promise.all(promises);

  for (const res of promiseResults) {
    let data = JSON.parse(res.choices[0].message.tool_calls[0].function.arguments);
    for (let i = 0; i < data['totalAmount'].length; i++) {
      statement.push(parseBankStatementResponse(
        data["totalAmount"][i],
        data["description"][i],
        data["toFrom"][i],
        data["category"][i],
        data["date"][i]
      ));
    }
  }
  
  return JSON.stringify(statement, null, 2);
}

export { processBankStatement };

