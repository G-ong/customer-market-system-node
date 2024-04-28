const express = require("express");
const router = express.Router();
const Activity = require("../model/activity");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

// 新增促销活动
router.post("/add/activity", (req, res) => {
  const {
    name,
    // status,
    time,
    remark = "",
    img = "activity-offer.png",
  } = req.body;
  const [startTime, endTime] = time.map((dateString) => new Date(dateString));
  const newUser = new Activity({
    name,
    // status,
    time: { start: startTime, end: endTime },
    remark,
    img,
  });

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

// 根据activityId获取促销活动信息
router.get("/activity/:activityId", (req, res) => {
  const activityId = req.params.activityId;
  const objectId = new ObjectId(activityId);

  Activity.find({ _id: objectId })
    .then((data) => {
      res.json({
        status: 200,
        msg: "查询成功",
        data: {
          name: data[0].name,
          time: data[0].time,
          remark: data[0].remark,
          img: data[0].img,
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

// 根据activityId修改促销活动信息
router.put("/activity/:activityId", async (req, res) => {
  const activityId = req.params.activityId;
  const { name, time, remark } = req.body;
  const [startTime, endTime] = time.map((dateString) => new Date(dateString));
  await Activity.findByIdAndUpdate(activityId, {
    name,
    time: { start: startTime, end: endTime },
    remark,
  })
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

// 根据activityId删除促销活动信息
router.delete("/activity/:activityId", async (req, res) => {
  const activityId = req.params.activityId;
  const objectId = new ObjectId(activityId);
  try {
    const deletedActivity = await Activity.findByIdAndDelete(objectId);
    if (!deletedActivity) {
      return res.json({
        status: 404,
        message: "未找到对应活动",
      });
    }
    return res.json({
      status: 200,
      message: "成功删除促销活动",
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "服务器错误",
    });
  }
});

module.exports = router;
