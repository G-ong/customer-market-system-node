const express = require("express");
const router = express.Router();
const Coupon = require("../model/coupon");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

// 新增优惠券活动
router.post("/add/coupon", (req, res) => {
  const { name, time, content } = req.body;
  const [startTime, endTime] = time.map((dateString) => new Date(dateString));
  const newCoupon = new Coupon({
    name,
    time: { start: startTime, end: endTime },
    content,
  });

  return newCoupon
    .save()
    .then(() => {
      res.json({
        status: 200,
        msg: "优惠券活动创建成功",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: err.message,
      });
    });
});

// 根据couponId获取优惠券活动信息
router.get("/coupon/:couponId", (req, res) => {
  const couponId = req.params.couponId;
  const objectId = new ObjectId(couponId);

  Coupon.find({ _id: objectId })
    .then((data) => {
      res.json({
        status: 200,
        msg: "查询成功",
        data: {
          name: data[0].name,
          time: data[0].time,
          content: data[0].content,
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

// 获取所有优惠券活动
router.get("/coupon", (req, res) => {
  Coupon.find({})
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

// 根据couponId修改优惠券活动信息
router.put("/coupon/:couponId", async (req, res) => {
  const couponId = req.params.couponId;
  const { name, time, content } = req.body;
  const [startTime, endTime] = time.map((dateString) => new Date(dateString));
  await Coupon.findByIdAndUpdate(couponId, {
    name,
    time: { start: startTime, end: endTime },
    content,
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

// 根据couponId删除优惠券活动信息
router.delete("/coupon/:couponId", async (req, res) => {
  const couponId = req.params.couponId;
  const objectId = new ObjectId(couponId);
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(objectId);
    if (!deletedCoupon) {
      return res.json({
        status: 404,
        message: "未找到对应活动",
      });
    }
    return res.json({
      status: 200,
      message: "成功删除优惠券活动",
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "服务器错误",
    });
  }
});

module.exports = router;
