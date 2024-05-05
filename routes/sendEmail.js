const express = require("express");
const nodemailer = require("nodemailer");
let router = express.Router();

const app = express();

// 发邮件
const transporter = nodemailer.createTransport({
  service: "163",
  auth: {
    user: "Gong_Chenjun@163.com",
    pass: "WFEPNDAFQCCWWIMS",
  },
});

// 定义发送邮件的路由
router.get("/sendEmail", (req, res) => {
  const mailOptions = {
    from: "gong_chenjun@163.com",
    to: "2180570454@qq.com",
    subject: "Hello from Express",
    text: "This is a test email sent from Express!",
  };

  // 使用邮件传输对象发送邮件
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.send("Email sent");
    }
  });
});

module.exports = router;
