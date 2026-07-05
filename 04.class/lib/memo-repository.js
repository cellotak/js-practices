import { DatabaseSync } from "node:sqlite";
import { Memo } from "./memo.js";

const DB_PATH = new URL("../memos.db", import.meta.url).pathname;

export class MemoRepository {
  constructor() {
    this.db = new DatabaseSync(DB_PATH);
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS memos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL
      )
    `);
  }

  fetchAll() {
    const rows = this.db.prepare("SELECT * FROM memos").all();
    return rows.map((row) => new Memo(row.id, row.content));
  }

  save(content) {
    this.db.prepare("INSERT INTO memos (content) VALUES (?)").run(content);
  }

  delete(id) {
    this.db.prepare("DELETE FROM memos WHERE id = ?").run(id);
  }
}
