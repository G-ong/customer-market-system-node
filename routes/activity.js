const express = require("express");
const multer = require("multer");
const router = express.Router();
const app = express();
const Activity = require("../model/activity");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 设置存储目录
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // 使用唯一的文件名
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/activity", upload.single("img"), async (req, res) => {
  try {
    const { file } = req;
    const { name } = req.body;

    // 创建新的数据对象
    const newData = new Activity({
      img: file.filename,
      name: name,
    });

    // 保存数据到数据库
    await newData.save();

    res.json({
      status: 401,
      msg: "图片存储成功",
      data: {
        id: newData._id, // 例如，使用保存到数据库后生成的 ID
        img: newData.img,
        // name: newData.name,
      },
    });
    // res.send("File uploaded successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
