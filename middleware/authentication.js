const express = require("express");
const jwt = require("jsonwebtoken");
express();
require("dotenv").config();

const authentication = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    res.send({ Message: "Login Please" });
  } else {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userID = decoded.userID;
    if (decoded) {
      req.body.userID = userID;
      next();
    } else {
      res.send({ Message: "Please login again" });
    }
  }
};

module.exports = { authentication };
