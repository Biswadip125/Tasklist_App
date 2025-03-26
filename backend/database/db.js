import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function initializeDB() {
  const db = await open({
    filename: "./todo.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY ,
      title TEXT NOT NULL, 
      description TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT 0
    )
  `);

  console.log("Connected to SQLite database.");
  return db;
}
