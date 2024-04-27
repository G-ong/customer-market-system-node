var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/user");
// var testRouter = require("./routes/test");
var loginRouter = require("./routes/login");
var getUserRouter = require("./routes/user");
var ActivityRouter = require("./routes/activity");
var ImgRouter = require("./routes/img");

var app = express();

// 启用 CORS 中间件, 解决跨域问题
const cors = require("cors");
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
// 引入并配置body-parser中间件, 用于解析req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
// app.use("/test", testRouter);
app.use("/", loginRouter);
app.use("/", getUserRouter);
app.use("/", ActivityRouter);
app.use("/", ImgRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

// const upload = multer({ storage: storage });

// app.post("/upload", upload.single("image"), function (req, res, next) {
//   console.log(
//     "%c [ req ]-66",
//     "font-size:13px; background:pink; color:#bf2c9f;",
//     req
//   );
//   // req.file 是 `image` 文件的信息
//   // req.body 将包含文本域中的其他表单数据
// });

module.exports = app;
