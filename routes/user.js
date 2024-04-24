var express = require("express");
var router = express.Router();
var User = require("../model/user");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

// GET /users
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// POST /users
router.post("/", function (req, res, next) {
  res.send("create a user");
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

// DELETE /users/:id
router.delete("/:id", function (req, res, next) {
  var userId = req.params.id;
  res.send("delete user with id: " + userId);
});

module.exports = router;
