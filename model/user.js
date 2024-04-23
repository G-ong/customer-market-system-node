const mongoose = require("../db/mongoose");

// 建立表
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  userGroup: String,
});

module.exports = mongoose.model("user", UserSchema, "user");
