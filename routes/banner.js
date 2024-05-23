const express = require("express");
const router = express.Router();
const Banner = require("../model/banner");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

// 新增横幅
router.post("/add/banner", (req, res) => {
  const { name, time, img } = req.body;
  const [startTime, endTime] = time.map((dateString) => new Date(dateString));
  const newBanner = new Banner({
    name,
    time: { start: startTime, end: endTime },
    img,
  });

  return newBanner
    .save()
    .then(() => {
      res.json({
        status: 200,
        msg: "横幅创建成功",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: err.message,
      });
    });
});

// 根据bannerId获取横幅信息
router.get("/banner/:bannerId", (req, res) => {
  const bannerId = req.params.bannerId;
  const objectId = new ObjectId(bannerId);

  Banner.find({ _id: objectId })
    .then((data) => {
      res.json({
        status: 200,
        msg: "查询成功",
        data: {
          name: data[0].name,
          time: data[0].time,
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

// 获取所有横幅
router.get("/banner", (req, res) => {
  Banner.find({})
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

// 根据bannerId修改横幅信息
router.put("/banner/:bannerId", async (req, res) => {
  const bannerId = req.params.bannerId;
  const { name, time, img } = req.body;
  const [startTime, endTime] = time.map((dateString) => new Date(dateString));
  await Banner.findByIdAndUpdate(bannerId, {
    name,
    time: { start: startTime, end: endTime },
    img,
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

// 根据bannerId删除横幅信息
router.delete("/banner/:bannerId", async (req, res) => {
  const bannerId = req.params.bannerId;
  const objectId = new ObjectId(bannerId);
  try {
    const deletedBanner = await Banner.findByIdAndDelete(objectId);
    if (!deletedBanner) {
      return res.json({
        status: 404,
        message: "未找到对应活动",
      });
    }
    return res.json({
      status: 200,
      message: "成功删除横幅",
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "服务器错误",
    });
  }
});

module.exports = router;
