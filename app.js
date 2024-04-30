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
var msgUserRouter = require("./routes/msgUser");
var messageRouter = require("./routes/message");

const messageHandler = require("./routes/message");

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
app.use("/", msgUserRouter);
app.use("/", messageRouter);

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

// 创建HTTP服务器并绑定到Express应用
const http = require("http");
const server = http.createServer(app);

// 绑定Socket.IO到HTTP服务器
const socketIo = require("socket.io");
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // 替换为你的前端服务器的地址
    methods: ["GET", "POST"],
  },
});

// "connection" 事件是 Socket.IO 提供的默认事件之一。当有客户端与服务器建立 WebSocket 连接时，Socket.IO 会自动触发 "connection" 事件，并执行回调函数中的逻辑。
io.on("connection", (socket) => {
  // console.log("a user connected");

  // // 向客户端发送欢迎消息
  // socket.emit("receive_message", "Welcome to the server!");
  // // 处理Socket.IO的事件...

  // // 管理端发送数据
  // socket.on("super_send", (msg) => {
  //   console.log(
  //     "%c [ msg ]-76",
  //     "font-size:13px; background:pink; color:#bf2c9f;",
  //     msg
  //   );
  // });

  // 监听 "send_message" 事件，将数据保存到数据库
  socket.on("send_message", (msg) => {
    messageHandler.saveMessageToDB(msg);
    // 广播消息给所有连接的客户端
    io.emit("receive_message", msg);
  });
});

// 监听3001端口
server.listen(3001, () => {
  console.log("listening on *:3001");
});

module.exports = app;
