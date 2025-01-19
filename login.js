const express = require("express");
const Router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("./userschema");
Router.post("/login", async (req, res) => {
  console.log("-------------", req.body);

  let email = req.body.email;
  let password = req.body.password;

  const hash = bcrypt.hashSync(password, 10);
  console.log("---hashed-----", hash);

  if (!email) {
    res.send({ status: 0, message: "email is required" });
  }

  if (!password) {
    res.send({ status: 0, message: "password is required" });
  }

  if (email && password) {
    const isEmailExist = await UserModel.findOne({ email: email });
    console.log(isEmailExist);

    if (isEmailExist == null) {
      res.send({ status: 0, message: "User not found" });
    } else {
      const existPassword = isEmailExist.password;
      const isPasswordRes = bcrypt.compareSync(password, existPassword);

      if (isPasswordRes) {
        const token = jwt.sign(
          { email: email, password: password },
          "Vibin@1997"
        );
        res.send({ status: 1, authtoken: token });
      } else {
        res.send({ status: 0, message: "wrong password" });
      }
    }
  }
});

module.exports = Router;
