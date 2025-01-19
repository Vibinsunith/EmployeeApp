const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  password: String,
  status: Boolean,
});

module.exports = mongoose.model("userdata", UserSchema);
