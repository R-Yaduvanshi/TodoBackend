const express = require("express");
const { connection } = require("./config/db");
const bcrypt = require("bcrypt");
const { UserModel } = require("./model/User.model");
const { signup } = require("./routes/signup.route");
const { login } = require("./routes/login.route");
const { createTodo } = require("./routes/createTodo.route");
const { authentication } = require("./middleware/authentication");
const { TodoModel } = require("./model/Todo.model");
const app = express();
const port = process.env.PORT || 8000;
require("dotenv").config();
app.use(express.json());

app.get("/todo", authentication, async (req, res) => {
  const { userID } = req.body;
  const todos = await TodoModel.find({ userID });
  res.send(todos);
});

//Signup part
app.post("/signup", signup);

//login

app.post("/login", login);

//Create todo

app.post("/todo/create", authentication, createTodo);

app.listen(port, async () => {
  try {
    await connection;
    console.log("connection to db successfull");
  } catch (err) {
    console.log("connecting to db unsuccessfull");
    console.log(err);
  }
  console.log("backend running on port no 8000");
});
