const express = require("express");
const Router = express.Router();

const UserModel = require("./userschema");

Router.delete("/delete", async (req, res) => {
  console.log("-------------", req.query);

  let email = req.query.email;
  let name = req.query.name;

  if (email && name) {
    const isEmailExist = await UserModel.findOneAndDelete({ email });

    res.send({ status: 1, message: "User Deleted" });
  }
});

module.exports = Router;
