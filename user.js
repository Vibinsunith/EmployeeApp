const express = require("express");
const Router = express.Router();

const jwt = require("jsonwebtoken");

const UserModel = require("./userschema");

Router.get("/userList", async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, "Vibin@1997");
    let userList = await UserModel.find({ status: true });
    res.send({ status: 1, count: userList.length, data: userList });
  } catch (err) {
    res.send({ status: 0, message: err });
  }
});

module.exports = Router;
