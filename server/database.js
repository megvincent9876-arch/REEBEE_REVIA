import Database from "better-sqlite3";

const db = new Database("reebee_revia.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    collection TEXT NOT NULL,
    image TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
try {
  db.exec(`
    ALTER TABLE products ADD COLUMN sizes TEXT;
    ALTER TABLE products ADD COLUMN colors TEXT;
  `);
} catch (error) {
  // Columns already exist
}

export default db;