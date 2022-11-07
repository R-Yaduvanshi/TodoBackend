const express = require("express");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/User.model");
require("dotenv").config();

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    res.send({ Message: "User not found, signup please" });
  } else {
    const hash_password = user.password;
    const generated_token = jwt.sign(
      { userID: user._id },
      process.env.SECRET_KEY
    );
    bcrypt.compare(password, hash_password, (err, result) => {
      if (err) {
        res.send({ Message: "Something went Wrong" });
      }
      if (result == true) {
        res.send({
          Message: "Login Successfull",
          token: generated_token,
        });
      }
      if (result === false) {
        res.send({ Message: "Wrong password" });
      }
    });
  }
};

module.exports = { login };
