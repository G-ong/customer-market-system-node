let express = require("express");
let router = express.Router();
const multer = require("multer");
let Img = require("../model/img");

/** 获取图片 */
router.get("/api/images/:filename", (req, res) => {
  const filename = req.params.filename;
  // 构建图片文件的绝对路径
  const imagePath = `D:/customer-up/customer-market-system-node/uploads/${filename}`;
  // 返回图片资源
  res.sendFile(imagePath);
});

/** 存储图片 */
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

router.post("/upload/image", upload.single("img"), async (req, res) => {
  try {
    const { file } = req;

    // 创建新的数据对象
    const newData = new Img({
      filename: file.filename,
    });

    // 保存数据到数据库
    await newData.save();

    res.json({
      status: 200,
      msg: "图片存储成功",
      data: {
        id: newData._id,
        filename: newData.filename,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
