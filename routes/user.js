var express = require("express");
var router = express.Router();
var User = require("../model/user");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

// 获取所有用户信息
router.get("/user", (req, res) => {
  User.find({})
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

// 根据userId获取用户信息
router.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  const objectId = new ObjectId(userId);

  User.find({ _id: objectId })
    .then((data) => {
      res.json({
        status: 200,
        msg: "查询成功",
        data: {
          name: data[0].name,
          email: data[0].email,
          password: data[0].password,
        },
      });
    })
    .catch((err) => {
      res.json({
        status: 404,
        msg: err.message,
      });
    });
});

// 新增用户
router.post("/user", (req, res) => {
  const { name = "", email, password, userGroup } = req.body;
  // 查询是否存在相同email
  User.findOne({ email }).then((existingUser) => {
    // 存在-->无法注册
    if (existingUser) {
      return res.json({
        status: 409,
        msg: "该邮箱已被注册",
      });
    } else {
      // 不存在-->创建新用户
      const newUser = new User({
        name,
        email,
        password,
        userGroup,
      });

      return newUser
        .save()
        .then(() => {
          res.json({
            status: 200,
            msg: "用户创建成功",
          });
        })
        .catch((err) => {
          res.json({
            status: 500,
            msg: err.message,
          });
        });
    }
  });
});

// 根据userId修改用户信息
router.put("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  const { name, password } = req.body;

  User.findByIdAndUpdate(userId, { name, password })
    .then(() => {
      res.json({
        status: 200,
        msg: "修改成功",
      });
    })
    .catch((err) => {
      res.json({
        status: 404,
        msg: err.message,
      });
    });
});

// 根据userId删除用户信息
router.delete("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  const objectId = new ObjectId(userId);
  try {
    const deletedUser = User.findByIdAndDelete(objectId);
    if (!deletedUser) {
      return res.json({
        status: 404,
        message: "未找到对应用户",
      });
    }
    return res.json({
      status: 200,
      message: "成功删除用户",
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "服务器错误",
    });
  }
});

module.exports = router;
