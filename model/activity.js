const mongoose = require("../db/mongoose");

// 建立表
const ActivitySchema = new mongoose.Schema({
  name: String,
  status: String,
  time: String,
  remark: String,
  img: String,
});

module.exports = mongoose.model("activity", ActivitySchema, "activity");
