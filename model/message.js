const mongoose = require("../db/mongoose");

const MessageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("message", MessageSchema, "message");
