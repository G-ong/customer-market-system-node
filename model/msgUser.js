const mongoose = require("../db/mongoose");

const MsgUserSchema = new mongoose.Schema({ name: String });

module.exports = mongoose.model("msgUser", MsgUserSchema, "msgUser");
