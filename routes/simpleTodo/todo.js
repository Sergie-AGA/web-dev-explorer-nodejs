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
    const todos = await Post.find().sort({ date: -1 });
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = Router;
