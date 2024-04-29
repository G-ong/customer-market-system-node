var express = require("express");
var router = express.Router();
const Message = require("../model/message");
const MsgUser = require("../model/msgUser");

function saveMessageToDB({ content, sender, receiver }) {
  const message = new Message({ content, sender, receiver });
  message
    .save()
    .then(() => {
      console.log("消息已保存到数据库");
      // 新增还未在消息列表的用户
      MsgUser.findOne({ name: { $ne: "super", $in: [sender, receiver] } }).then(
        (user) => {
          if (!user) {
            const newUser = new MsgUser({
              name: sender !== "super" ? sender : receiver,
            });
            return newUser.save();
          }
          return user;
        }
      );
    })
    .catch((error) => {
      console.error("保存消息时出错:", error);
    });
}

module.exports = {
  saveMessageToDB,
};

// 根据用户名获取消息列表
router.get(
  "/msg",
  (req, res) => {
    const query = {
      $or: [{ sender: req.query.name }, { receiver: req.query.name }],
    };
    return Message.find(query)
      .then((messages) => {
        res.json({
          status: 200,
          msg: "查询成功",
          data: messages,
        });
      })
      .catch((err) => {
        res.json({
          status: 404,
          msg: err.message,
        });
      });
  }

  // MsgUser.find({})
  //   .then((data) => {
  //     res.json({
  //       status: 200,
  //       msg: "查询成功",
  //       data: data,
  //     });
  //   })
  //   .catch((err) => {
  //     res.json({
  //       status: 404,
  //       msg: err.message,
  //     });
  //   });
  // }
);

module.exports = router;
