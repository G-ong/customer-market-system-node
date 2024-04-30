const mongoose = require("../db/mongoose");

const MsgUserSchema = new mongoose.Schema({ name: String, isNew: Boolean });

module.exports = mongoose.model("msgUser", MsgUserSchema, "msgUser");
