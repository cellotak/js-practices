export class Memo {
  constructor(id, content) {
    this.id = id;
    this.title = content.split("\n")[0];
    this.content = content;
  }
}
