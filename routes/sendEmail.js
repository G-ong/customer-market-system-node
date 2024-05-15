const express = require("express");
const nodemailer = require("nodemailer");
const Coupon = require("../model/coupon");
const User = require("../model/user");
let router = express.Router();

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const app = express();

// 发邮件
const transporter = nodemailer.createTransport({
  service: "163",
  auth: {
    user: "Gong_Chenjun@163.com",
    pass: "ZFPTTLJNTIKGEBLD",
  },
});

// 定义发送邮件的路由
router.get("/sendEmail/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const objectId = new ObjectId(couponId);

    // 获取对应优惠券信息
    const [couponData] = await Coupon.find({ _id: objectId });

    // 获取所有用户的邮箱
    const userData = await User.find({});
    const userEmails = userData.map((user) => user.email);

    const mailOptions = {
      from: "gong_chenjun@163.com",
      to: userEmails,
      subject: couponData.name,
      text: couponData.content,
    };

    // 使用邮件传输对象发送邮件
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        res.status(500).send("Error sending email");
      } else {
        res.json({
          status: 200,
          msg: "发送成功",
        });
      }
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Error sending email");
  }
});

/** 写死的邮件发送 */

// // 定义发送邮件的路由
// router.get("/sendEmail", (req, res) => {
//   const mailOptions = {
//     from: "gong_chenjun@163.com",
//     to: "2180570454@qq.com",
//     subject: "Hello from Express",
//     text: "This is a test email sent from Express!",
//   };

//   // 使用邮件传输对象发送邮件
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log("Error sending email:", error);
//       res.status(500).send("Error sending email");
//     } else {
//       console.log("Email sent:", info.response);
//       res.send("Email sent");
//     }
//   });
// });

module.exports = router;
