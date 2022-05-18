const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const loginCheck = require("./middleware")
const app = express()

const router = require("./router/index")
const userRouter = require("./router/user")
const blogRouter = require("./router/blog")

// 可以通过req.cookies来获取cookie
app.use(cookieParser())
// 日志记录
app.use(logger("dev"))
// post请求时，可以直接从req.body中获取参数
app.use(express.json())
// 兼容urlencoded格式的数据
app.use(express.urlencoded({ extended: false }))
// 中间件
app.use(loginCheck)

// 注册路由 前缀，路由实例
app.use("/", router)
app.use("/user", userRouter)
app.use("/blog", blogRouter)

// 报错时作出的响应
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
