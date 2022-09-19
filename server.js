const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

app.use(express.json({ extended: false }));

//Define routes
app.use("/simpleTodo", require("./routes/simpleTodo/todo"));
app.use("/simpleTodoLocal", require("./routes/simpleTodo/localTodo"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
