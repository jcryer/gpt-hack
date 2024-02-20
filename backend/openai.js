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

 // const receipt1Res = await openai.embeddings.create({
  //   input: receipt,
  //   model: 'text-embedding-3-small',
  //   timeout: 10
  // });
  // const receipt = `${rObj['totalAmount']} ${rObj['description']} ${rObj['toFrom']} ${rObj['category']} ${rObj['date']}`;
  // console.log(receipt);



async function reconcilai(statements=defaultBankCallData, invoices=defaultReceiptData) {
  // Function to chunk statements array into smaller arrays of length 5
  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // Chunk statements into batches of 5
  const statementBatches = chunkArray(statements, 5);

  // Prepare batches for parallel processing with invoices
  const tasks = invoices.map((invoice, index) => {
    return statementBatches.map((batch) => {
      const messages = [
        {
          role: "system",
          content: "Return the id of the statement that matches the invoice in the following format: ID: 123. Note that matches will not be exact due to OCR numebrs dont have to match or dates or references, make informed guesses. answer n/a if none appear to match, desptite your best guess.",
        },
        {
          role: "user",
          content: JSON.stringify({ statements: batch, invoice: invoice }),
        },
      ];

      return openai.chat.completions.create({
        model: "gpt-4-1106-preview",
        messages: messages,
        max_tokens: 300,
      });
    });
  }).flat();

  // Execute all tasks in parallel
  const results = await Promise.all(tasks);
  console.log(results)
  // Process results to find matches
  const matches = results.map((result, index) => {
  // Assuming the response is a text that includes an ID in a predictable format
  const textResponse = result.choices[0].message.content
  console.log(textResponse)
  // Regex pattern to find "ID: <number>" and extract the number
  const idPattern = /\d+/;
  const match = textResponse.match(idPattern);

  // Extract the ID from the regex match result, default to null if not found
  const matchingStatementId = match ? parseInt(match[1], 10) : null;

  return {
    invoiceId: Math.floor(index / statementBatches.length),
    statementId: matchingStatementId,
  };
});

  // Return the ids of the matching statements and invoices
  return matches;
}







  const normalizeAmount = (amount) => {
    // Convert to string, remove the decimal point and leading zeros
    return amount.toString().replace('.', '').replace(/^0+/, '');
  };

  
  
  async function matchInvoicesAndStatements(bankCallData = defaultBankCallData, receiptData = defaultReceiptData) {
    // Step 1: Assign unique IDs and normalize amounts
    const amountOccurrences = new Map();
  
    bankCallData.forEach((item, index) => {
      item.id = index;
      item.normalizedAmount = normalizeAmount(Math.abs(item.totalAmount));
      amountOccurrences.set(item.normalizedAmount, (amountOccurrences.get(item.normalizedAmount) || 0) + 1);
    });
  
    receiptData.forEach((item, index) => {
      item.id = index;
      item.normalizedAmount = normalizeAmount(Math.abs(item.totalAmount));
      // We count occurrences only to identify uniqueness across both datasets
      amountOccurrences.set(item.normalizedAmount, (amountOccurrences.get(item.normalizedAmount) || 0) + 1);
    });
  
    // Prepare the result objects
    const matches = [];
    const unmatched = [];
  
    // Step 2: Attempt to match based on unique normalized amount first
    // First, prepare for matching on unique normalized amounts
const uniqueAmountsInReceipts = new Map();
const uniqueAmountsInBankCalls = new Map();

receiptData.forEach(invoice => {
    uniqueAmountsInReceipts.set(invoice.normalizedAmount, (uniqueAmountsInReceipts.get(invoice.normalizedAmount) || 0) + 1);
});

bankCallData.forEach(statement => {
    uniqueAmountsInBankCalls.set(statement.normalizedAmount, (uniqueAmountsInBankCalls.get(statement.normalizedAmount) || 0) + 1);
});

// Perform matching
receiptData = receiptData.filter(invoice => {
  let matchFound = false;

  // First attempt: Match on unique normalized amounts alone
  if (uniqueAmountsInReceipts.get(invoice.normalizedAmount) === 1 && uniqueAmountsInBankCalls.get(invoice.normalizedAmount) === 1) {
    const matchIndex = bankCallData.findIndex(statement => statement.normalizedAmount === invoice.normalizedAmount);
    if (matchIndex !== -1) {
      matches.push({ statementId: bankCallData[matchIndex].id, invoiceId: invoice.id });
      bankCallData.splice(matchIndex, 1); // Remove matched item from bankCallData
      matchFound = true;
    }
  }

  return !matchFound; // Keep unmatched for the second attempt
});

// Second attempt: Match on having the same date and monetary value
let tempReceiptData = []; // To hold receipts that are still unmatched after the second attempt
receiptData.forEach(invoice => {
  const invoiceDate = new Date(invoice.date).getTime();
  const matchIndex = bankCallData.findIndex(statement =>
      statement.normalizedAmount === invoice.normalizedAmount &&
      new Date(statement.date).getTime() === invoiceDate);

  if (matchIndex !== -1) {
    matches.push({ statementId: bankCallData[matchIndex].id, invoiceId: invoice.id });
    // Do not immediately remove the matched item to allow for potential duplicates
  } else {
    tempReceiptData.push(invoice); // Keep unmatched for further analysis or processing
  }
});

// Update receiptData with the truly unmatched
receiptData = tempReceiptData;
        




      
        // Return the results
        return {
          matched: matches,
          unmatched: unmatched
        };
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

export { processBankStatement, processInvoice, matchInvoicesAndStatements, reconcilai };
