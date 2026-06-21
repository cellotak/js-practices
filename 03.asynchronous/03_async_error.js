import { run, all, close } from "./db.js";

const main = async () => {
  await run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );

  try {
    await run("INSERT INTO books (title) VALUES (?)", [null]);
  } catch (err) {
    console.error(err.message);
  }

  try {
    await all("SELECT * FROM nonexistent_table");
  } catch (err) {
    console.error(err.message);
  }

  await run("DROP TABLE books");
  await close();
};

main();
