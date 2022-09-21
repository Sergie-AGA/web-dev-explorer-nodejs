// This type of todo will run on memory only, without a database connection.

const express = require("express");
const Router = express.Router();
const LocalTodo = require("../../../models/componentIdeas/simpleTodo/LocalTodo");

const todos = [];

Router.post("/", (req, res) => {
  if (!req.body.text) {
    return res.status(400).send("Text is required");
  }

  const todo = new LocalTodo(req.body.text);
  todos.push(todo);

  return res.status(201).json({ todo });
});

Router.get("/", (req, res) => {
  return res.status(200).json(todos);
});

Router.put("/:id", (req, res) => {
  const index = todos.findIndex((todo) => todo.id === req.params.id);

  if (index == -1) {
    return res.status(404).json({ msg: "Todo Not Found" });
  }

  if (!req.body.text) {
    return res.status(400).json({ msg: "Text is required" });
  }

  todos[index].text = req.body.text;
  return res.status(201).json(todos);
});

Router.delete("/:id", (req, res) => {
  const index = todos.findIndex((todo) => todo.id === req.params.id);

  if (index == -1) {
    return res.status(404).json({ msg: "Todo Not Found" });
  }

  todos.splice(index, 1);

  return res.status(200).json({ msg: "Todo deleted successfully", todos });
});

module.exports = Router;
