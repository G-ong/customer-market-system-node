var express = require("express");
var router = express.Router();
var User = require("../model/user");

// 用户登录
router.post("/login", async (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  try {
    var user = await User.findOne({ email: email });
    if (user) {
      if (user.password === password) {
        res.json({
          status: 200,
          msg: "登录成功",
          // 返回_id作为唯一标识：userId
          data: {
            userId: user._id,
            userName: user.name,
          },
        });
      } else {
        res.json({
          status: 401,
          msg: "邮箱或密码错误",
        });
      }
    } else {
      res.json({
        status: 404,
        msg: err.message,
      });
    }
  } catch (err) {
    res.json({
      status: 500,
      msg: err.message,
    });
  }
});

module.exports = router;
