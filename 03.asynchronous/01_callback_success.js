import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run(
      "INSERT INTO books (title) VALUES (?)",
      ["JavaScript入門"],
      function () {
        console.log("レコードID:", this.lastID);

        db.all("SELECT * FROM books", (err, rows) => {
          rows.forEach((row) => {
            console.log(row);
          });

          db.run("DROP TABLE books", () => {
            db.close();
          });
        });
      },
    );
  },
);
