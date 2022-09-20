const express = require("express");
const Router = express.Router();
const { check, validationResult } = require("express-validator/check");
const { v4: uuidv4 } = require("uuid");

const Todo = require("../../models/simpleTodo/Todo");

Router.post(
  "/",
  [check("text", "Text is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const todo = new Todo({
        text: req.body.text,
        date: new Date(),
        id: uuidv4(),
      });

      await todo.save();

      return res.status(201).json({ todo });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

Router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ date: -1 });
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

Router.put(
  "/:id",
  [check("text", "Text is required").not().isEmpty()],
  async (req, res) => {
    try {
      const todo = await Todo.findOneAndUpdate(
        { id: req.params.id },
        {
          text: req.body.text,
        },
        { new: true }
      );

      if (!todo) {
        return res.status(404).json({ msg: "Todo not found" });
      }

      res.status(201).json(todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

Router.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndRemove({ id: req.params.id });

    if (!deletedTodo) {
      res.status(404).json({ msg: "Todo not found" });
    }

    res
      .status(201)
      .json({ msg: "Todo deleted successfully", deletedTodo: deletedTodo });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = Router;
