import { run, all, close } from "./db.js";

const main = async () => {
  await run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );

  const lastID = await run("INSERT INTO books (title) VALUES (?)", [
    "JavaScript入門",
  ]);
  console.log("レコードID:", lastID);

  const rows = await all("SELECT * FROM books");

  rows.forEach((row) => {
    console.log(row);
  });

  await run("DROP TABLE books");
  await close();
};

main();
