// This type of todo will run on memory only, without a database connection.

const express = require("express");
const Router = express.Router();
const LocalTodo = require("../../models/simpleTodo/LocalTodo");

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

module.exports = Router;
