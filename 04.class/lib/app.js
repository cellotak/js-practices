import * as readline from "node:readline/promises";
import { MemoRepository } from "./memo-repository.js";
import Enquirer from "enquirer";

export class App {
  constructor() {
    this.repository = new MemoRepository();
  }

  async run() {
    const option = process.argv[2];

    switch (option) {
      case "-l":
        this.list();
        break;
      case "-r":
        await this.read();
        break;
      case "-d":
        await this.delete();
        break;
      default:
        this.add();
    }
  }

  list() {
    const memos = this.repository.fetchAll();
    if (memos.length === 0) {
      console.log("No memos found.");
      return;
    }
    memos.forEach((memo) => {
      console.log(memo.title);
    });
  }

  add() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const lines = [];

    rl.on("line", (line) => {
      lines.push(line);
    });

    rl.on("close", () => {
      this.repository.save(lines.join("\n"));
    });
  }

  async read() {
    const selectedMemo = await this.#selectMemo(
      "Choose a note you want to read:",
    );
    if (!selectedMemo) return;
    console.log(selectedMemo.content);
  }

  async delete() {
    const selectedMemo = await this.#selectMemo(
      "Choose a note you want to delete:",
    );
    if (!selectedMemo) return;
    this.repository.delete(selectedMemo.id);
  }

  async #selectMemo(message) {
    const memos = this.repository.fetchAll();

    if (memos.length === 0) {
      console.log("No memos found.");
      return null;
    }

    const prompt = new Enquirer.Select({
      name: "memo",
      message,
      choices: memos.map((memo) => ({ name: memo.title, value: memo.id })),
      result(name) {
        return this.map(name)[name];
      },
    });

    const selectedId = await prompt.run();
    return memos.find((memo) => memo.id === Number(selectedId));
  }
}
