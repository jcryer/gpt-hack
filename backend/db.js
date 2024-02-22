import sqlite3 from 'sqlite3';
import { open } from 'sqlite'

let db = null;
async function setup() {
  db = await open({filename: 'main.db', driver: sqlite3.Database});
  await db.run(`CREATE TABLE IF NOT EXISTS "users" ("id" integer primary key autoincrement, "name" text)`);
  await db.run(`CREATE TABLE IF NOT EXISTS "bank_statements" ("id" integer primary key autoincrement,"user_id" integer NOT NULL)`);
  await db.run(`CREATE TABLE IF NOT EXISTS "bank_statement_rows" ("id" integer primary key autoincrement,"bank_statement_id" integer NOT NULL,"total_amount" num,"description" text,"to_from" text,"category" text,"date" datetime, "receipt_id" integer)`);
  await db.run(`CREATE TABLE IF NOT EXISTS "receipts" ("id" integer primary key autoincrement,"user_id" integer NOT NULL,"total_amount" num,"description" text,"to_from" text,"category" text,"date" datetime, "file_name" text)`);
}

async function createUser(name) {
  const res = await db.run("INSERT INTO users (name) VALUES (?)", [name]);
  return res.lastID;
}

async function createReceipt(gptObj, userId, fileName) {
  const res = await db.run("INSERT INTO receipts (user_id, total_amount, description, to_from, category, date, file_name) " +
                           "VALUES (?, ?, ?, ?, ?, ?, ?)", [userId, gptObj['totalAmount'], gptObj['description'], gptObj['toFrom'], gptObj['category'], new Date(gptObj['date']).toISOString(), fileName]);
  return res.lastID;
}

async function createBankStatement(gptObj, userId) {
  const bank = await db.run("INSERT INTO bank_statements (user_id) VALUES (?)", [userId]);
  for (const bankItem of gptObj) {
    await db.run("INSERT INTO bank_statement_rows (total_amount, description, to_from, category, date, bank_statement_id)" +
      " VALUES (?, ?, ?, ?, ?, ?)", [bankItem['totalAmount'], bankItem['description'], bankItem['toFrom'], bankItem['category'], new Date(bankItem['date']).toISOString(), bank.lastID]);
  }
  return bank.lastID;
}

function test() {
  db.serialize(() => {

    db.run("INSERT INTO users (name) VALUES (?)", ["aaaa"]);
    db.each("SELECT id, name FROM users", (err, row) => {
      console.log(row.id + ": " + row.name);
    });
    console.log("done");
  });
}

export { setup, createUser, createReceipt, createBankStatement };
