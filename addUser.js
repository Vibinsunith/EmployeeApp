const express = require("express");
const Router = express.Router();

const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("./userschema");

Router.post("/addUser", async (req, res) => {
  console.log("-------------", req.body);

  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let address = req.body.address;

  const hash = bcrypt.hashSync(password, 10);
  console.log("---hashed-----", hash);

  if (!name) {
    res.send({ status: 0, message: "name is required" });
  }
  if (!email) {
    res.send({ status: 0, message: "email is required" });
  }

  if (!password) {
    res.send({ status: 0, message: "password is required" });
  }

  if (name && email && password) {
    isEmailExist = await UserModel.findOne({ email: email });
    if (isEmailExist) {
      res.send({ status: 0, message: "user already exists" });
    } else {
      const newUser = new UserModel({
        name: name,
        email: email,
        address: address,
        password: hash,
        status: true,
      });

      const response = await newUser.save();
      console.log("----response----", response);
      res.send({ status: 1, userId: response.id, message: "User Created" });
    }
  }
});

module.exports = Router;
