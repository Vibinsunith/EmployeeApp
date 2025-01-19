const express = require("express");
const Router = express.Router();

const bcrypt = require("bcrypt");

Router.get("/productList", (req, res) => {
  let userList = [
    {
      id: 1,
      name: "venky",
      email: "venky@gmail.com",
    },
    {
      id: 2,
      name: "chidambaram",
      email: "chidambaram@gmail.com",
    },
    {
      id: 3,
      name: "vibin",
      email: "vibin@gmail.com",
    },
    {
      id: 4,
      name: "bharath",
      email: "bharath@gmail.com",
    },
  ];

  res.send({ status: 1, count: userList.length, data: userList });
});

Router.post("/addProduct", (req, res) => {
  console.log("-------------", req.body);

  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;

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
    let reqPObj = {
      id: 1,
      message: "user added successfully",
    };
    res.send(reqPObj);
  }
});

module.exports = Router;
