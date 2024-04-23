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
        list: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 404,
        msg: err.message,
      });
    });
});

// PUT /users/:id
router.put("/:id", function (req, res, next) {
  var userId = req.params.id;
  res.send("update user with id: " + userId);
});

// DELETE /users/:id
router.delete("/:id", function (req, res, next) {
  var userId = req.params.id;
  res.send("delete user with id: " + userId);
});

module.exports = router;

// import axios from 'axios';

// const userId = "66260ad196d7a59eb079a36e";
// const url = `http://localhost:3000/user/${userId}`;

// axios.get(url)
//   .then(response => {
//     // 处理响应数据
//     const data = response.data;
//     console.log(data);
//   })
//   .catch(error => {
//     // 处理错误
//     console.error(error);
//   });
