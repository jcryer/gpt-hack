import OpenAI from 'openai';
import 'dotenv/config';
import { defaultBankCallData, defaultReceiptData } from './defaultData.js';

const openai = new OpenAI();

const chunkMaker = (arr, size) => arr.length > size ? [arr.slice(0, size), ...chunkMaker(arr.slice(size), size)] : [arr];

function parseResponse(totalAmount, description, toFrom, category, date) {
  return { totalAmount, description, toFrom, category, date };
}

async function doBankStatementRequest(chunk) {
  return openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      { 
        role: "user",
        content: `${chunk.join('\n')}` 
      },
      {
        role: "system",
        content: "You are an accounting bot designed to function call in order to parse bank statements. Parse the document data with the function. Ensure entries into arrays preserve order between inputs."
      }
    ],
    max_tokens: 4096,
    tools: [{
      type: "function",
      function: {
        name: "parseDoc",
        description: "Extracts essential information from a bank statement, including total amount, category, description, and date.",
        parameters: {
          type: "object",
          properties: {
            totalAmount: {
              type: "array",
              items: {
                type: "number",
                description: "A monetary amount, which can be positive or negative."
              },
              description: "The total monetary amounts on the item. It can be + or -"
            },
            description: {
              type: "array",
              items: {
                type: "string",
                description: "Textual description of the item."
              },
              description: "A brief description or reference of what the item is for. Include any extra notes here."
            },
            toFrom: {
              type: "array",
              items: {
                type: "string",
                description: "Recipient/Sender (To/From)"
              },
              description: "Name of recipient/sender."
            },
            category: {
              type: "array",
              items: {
                type: "string",
                description: "Category name."
              },
              description: "A traditional accounting category/classification for the incoming, outgoing item"
            },
            date: {
              type: "array",
              items: {
                type: "string",
                description: "Date in ISO 8601 format."
              },
              description: "The dates when the items were issued, preferably in ISO 8601 format (YYYY-MM-DD)."
            }
          },
          required: ["totalAmount", "description", "date", "toFrom", "category"]
        }
      }
    }]
  });
}

async function processBankStatement(csv) {
  if (process.env.DEFAULT_DATA) return defaultBankCallData;

  const chunks = chunkMaker(csv.split('\n').slice(1), 10);

  let promises = chunks.map(c => doBankStatementRequest(c));
  let promiseResults = await Promise.all(promises);
  let statement = [];

  for (const res of promiseResults) {
    let data = JSON.parse(res.choices[0].message.tool_calls[0].function.arguments);
    for (let i = 0; i < data['totalAmount'].length; i++) {
      statement.push(parseResponse(
        data["totalAmount"][i],
        data["description"][i],
        data["toFrom"][i],
        data["category"][i],
        data["date"][i]
      ));
    }
  }

  return statement;
}

async function processInvoice(data) {
  const res = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "user",
        content: `${data}`
      },
      {
        role: "system",
        content: "You are an accounting bot designed to function call in order to parse bank statements. Parse the document data with the function."
      }
    ],
    max_tokens: 300,
    tools: [{
      type: "function",
      function: {
        name: "parseDoc",
        description: "Extracts essential information from an invoice, including total amount, description, and date.",
        parameters: {
          type: "object",
          properties: {
            totalAmount: {
              type: "number",
              description: "The total monetary amount charged on the invoice."
            },
            description: {
              type: "string",
              description: "A brief description or reference of what the invoice is for."
            },
            date: {
              type: "string",
              description: "The date when the invoice was issued, preferably in ISO 8601 format (YYYY-MM-DD)."
            },
            toFrom: {
              type: "string",
              description: "Name of Recipient/Sender (To/From)"
            },
            category: {
              type: "string",
              description: "Category name.A traditional accounting category/classification for the incoming/outgoing item."
            },
          },
        },
        required: ["totalAmount", "description", "date", "toFrom", "category"]
      }
    }]
  });

  return JSON.parse(res.choices[0].message.tool_calls[0].function.arguments);
}

async function testEmbedding() {
  const strs = defaultBankCallData.map(x => `${x['totalAmount']} ${x['description']} ${x['toFrom']} ${x['category']} ${x['date']}`);
  const statementRes = await openai.embeddings.create({
    input: strs,
    model: 'text-embedding-3-small',
    timeout: 10
  });
  const statementEmbeddings = statementRes.data;

  const rObj = defaultReceiptData[1];
  const receipt = `${rObj['totalAmount']} ${rObj['description']} ${rObj['toFrom']} ${rObj['category']} ${rObj['date']}`;
  console.log(receipt);

  const receipt1Res = await openai.embeddings.create({
    input: receipt,
    model: 'text-embedding-3-small',
    timeout: 10
  });
  const receiptEmbedding = receipt1Res.data;

  let resIndex = -1;
  let maxCos = -3;
  for (let i = 0; i < statementEmbeddings.length; i++) {
    const cosRes = cosineSimilarity(statementEmbeddings[i].embedding, receiptEmbedding[0].embedding);
    if (cosRes > maxCos) {
      maxCos = cosRes;
      resIndex = i;
    }
  }
  return { index: resIndex, cos: maxCos, res: strs[resIndex] };
}

function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0.0;
  let normA = 0.0;
  let normB = 0.0;

  if (vecA.length !== vecB.length) {
    throw new Error('Vectors are of different lengths');
  }

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] ** 2;
    normB += vecB[i] ** 2;
  }

  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);

  if (normA === 0 || normB === 0) {
    throw new Error('One of the vectors is zero, cannot compute cosine similarity');
  }

  return dotProduct / (normA * normB);
}

export { processBankStatement, processInvoice, testEmbedding };
