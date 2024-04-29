var express = require("express");
var router = express.Router();
var MsgUser = require("../model/msgUser");

// 获取所有用户
router.get("/msg/user/list", (req, res) => {
  MsgUser.find({})
    .then((data) => {
      res.json({
        status: 200,
        msg: "查询成功",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 404,
        msg: err.message,
      });
    });
});

module.exports = router;
