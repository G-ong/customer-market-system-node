const mongoose = require("../db/mongoose");

// 建立表
const ActivitySchema = new mongoose.Schema({
  name: String,
  userGroup: String,
  time: {
    start: Date,
    end: Date,
  },
  remark: String,
  img: String,
});

module.exports = mongoose.model("activity", ActivitySchema, "activity");
