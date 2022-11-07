const express = require("express");
const { UserModel } = require("../model/User.model");
const app = express();
const bcrypt = require("bcrypt");
app.use(express.json());

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserModel.findOne({ email });
  console.log("=>", user);

  if (user) {
    res.send({ Message: "User already exists" });
  } else {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send({ Message: "Something went wrong" });
      }

      const new_user = new UserModel({
        name,
        email,
        password: hash,
      });

      try {
        await new_user.save();
        res.send({ Message: "Signup successful" });
      } catch (err) {
        res.send({ Message: "somthing went wrong" });
      }
    });
  }
};

module.exports = { signup };
