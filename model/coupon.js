const mongoose = require("../db/mongoose");

// 建立表
const CouponSchema = new mongoose.Schema({
  name: String,
  time: {
    start: Date,
    end: Date,
  },
  content: String,
});

module.exports = mongoose.model("coupon", CouponSchema, "coupon");
