const cors = require("cors")
const fs = require("fs")
const path = require("path")
const express = require("express")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const { loginCheck } = require("./middleware")
const RedisStore = require("connect-redis")(session)
const { redisClient } = require("./redis")
const { accessWriteStream } = require("./utils/log")
const env = process.env.NODE_ENV
const app = express()

const blogRouter = require("./router/blog")
const userRouter = require("./router/user")

const cookieMaxAge = 24 * 60 * 60 * 1000
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(cors())
// 可以通过req.cookies来获取cookie
app.use(cookieParser())
// 日志记录
app.use(
  logger(env === "production" ? "combined" : "dev", {
    stream: accessWriteStream
  })
)
// post请求时，可以直接从req.body中获取参数
app.use(express.json())
// 兼容urlencoded格式的数据
app.use(express.urlencoded({ extended: false }))
// session
app.use(
  session({
    // 密匙
    secret: "14iwnl_Nash1145?",
    cookie: {
      // 根目录
      path: "/",
      // 禁止js访问cookie
      httpOnly: true,
      // 生效时间
      maxAge: cookieMaxAge
    },
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
)
// 中间件
// app.use(loginCheck)

// 注册路由 前缀，路由实例
app.use("/blog", blogRouter)
app.use("/user", userRouter)

// 报错时作出的响应
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
