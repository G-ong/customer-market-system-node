const mongoose = require("../db/mongoose");

const ImgSchema = new mongoose.Schema({
  filename: String,
});

module.exports = mongoose.model("img", ImgSchema, "img");
