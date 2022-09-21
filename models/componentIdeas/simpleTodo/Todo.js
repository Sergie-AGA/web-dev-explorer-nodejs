const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Todo = mongoose.model("todo", TodoSchema);
