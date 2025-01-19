const express = require("express");
const app = express();
//const hostname = "localhost";
const PORT = process.env.PORT || 9000;
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors({}));

const connection = mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("connected successfully"))
  .catch((err) => console.log(err));

const User = require("./user");
const Login = require("./login");
const AddUser = require("./addUser");
const Delete = require("./delete");

const Product = require("./product");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", User);
app.use("/user", Login);
app.use("/user", AddUser);
app.use("/user", Delete);
app.use("/product", Product);

app.get("/", (req, res) => {
  console.log("-------------", req.query);
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log("MONGO_URI:", process.env.MONGO_URI);
  console.log(`Server running on port ${PORT}`);
});
