const express = require("express");
const router = express.Router();
const Activity = require("../model/activity");

// 新增促销活动
router.post("/add/activity", (req, res) => {
  const {
    name,
    status,
    time,
    remark = "",
    img = "activity-offer.jpg",
  } = req.body;
  const newUser = new Activity({ name, status, time, remark, img });

  return newUser
    .save()
    .then(() => {
      res.json({
        status: 200,
        msg: "促销活动创建成功",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: err.message,
      });
    });
});

// 获取所有促销活动
router.get("/activity", (req, res) => {
  Activity.find({})
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
