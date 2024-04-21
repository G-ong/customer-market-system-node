// 表
// 引入mongodb
const mongoose = require("../db/mongoose");

// 建立表
const TestSchema = new mongoose.Schema({
  name: String,
});

const TestModel = mongoose.model("test", TestSchema);
TestModel.create({
  name: "dasd",
})
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
    // 关闭数据库连接（项目运行时不添加该代码）
    // mongoose.disconnect();
  });

// 创建索引
// TestSchema.index({ id: 1 });

// 建立数据库模型
// module.exports = mongoose.model("test", TestSchema);
// 手动指定集合名称, 不默认添加s;
module.exports = mongoose.model("test", TestSchema, "test");
