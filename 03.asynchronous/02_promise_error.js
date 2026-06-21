import { run, all, close } from "./db.js";

run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() =>
    run("INSERT INTO books (title) VALUES (?)", [null]).catch((err) =>
      console.error(err.message),
    ),
  )
  .then(() => {
    all("SELECT * FROM nonexistent_table").catch((err) =>
      console.error(err.message),
    );
  })
  .then(() => run("DROP TABLE books"))
  .then(() => {
    close();
  });
