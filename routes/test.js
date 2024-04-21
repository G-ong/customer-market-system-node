let express = require("express");
let router = express.Router();
let test = require("../model/test");

/**
 * 查询test表数据
 */
router.get("/", (req, res) => {
  test
    .find({})
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

module.exports = router;
