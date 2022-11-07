const express = require("express");
const { TodoModel } = require("../model/Todo.model");
const { UserModel } = require("../model/User.model");

const createTodo = async (req, res) => {
  const { taskname, status, tag, userID } = req.body;

  const new_todo = new TodoModel({
    taskname,
    status,
    tag,
    userID,
  });

  await new_todo.save();
  res.send({ Message: "Todo Created" });
};

module.exports = { createTodo };
