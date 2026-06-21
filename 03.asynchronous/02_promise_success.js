import { run, all, close } from "./db.js";

run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => run("INSERT INTO books (title) VALUES (?)", ["JavaScript入門"]))
  .then((lastID) => {
    console.log("レコードID:", lastID);
  })
  .then(() => all("SELECT * FROM books"))
  .then((rows) => {
    rows.forEach((row) => {
      console.log(row);
    });
  })
  .then(() => run("DROP TABLE books"))
  .then(() => {
    close();
  });
