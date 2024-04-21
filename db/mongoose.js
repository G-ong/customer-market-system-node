// 引入mongoose
var mongoose = require("mongoose");
// 导入配置文件
const { DBHOST, DBPORT, DBNAME } = require("../config/index.js");
mongoose.set("strictQuery", true);
// 连接MongoDB数据库
mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`, {
  useNewUrlParser: true,
});
mongoose.connection.on("connected", function () {
  console.log("MongoDB连接成功.");
});

mongoose.connection.on("error", function () {
  console.log("MongoDB连接失败.");
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB连接断开.");
});
module.exports = mongoose;
