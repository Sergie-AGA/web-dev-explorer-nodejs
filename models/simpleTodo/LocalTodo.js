const { v4 } = require("uuid");

class LocalTodo {
  constructor(text) {
    this.id = v4();
    this.text = text;
    this.date = new Date();
  }
}

module.exports = LocalTodo;
