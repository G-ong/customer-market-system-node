const mongoose = require("../db/mongoose");

// 建立表
const BannerSchema = new mongoose.Schema({
  img: String,
  name: String,
  time: {
    start: Date,
    end: Date,
  },
});

module.exports = mongoose.model("banner", BannerSchema, "banner");
