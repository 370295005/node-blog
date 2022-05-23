const Koa = require("koa")
const app = new Koa()
const json = require("koa-json")
const bodyParser = require("koa-bodyparser")
const logger = require("koa-logger")

// 路由
const user = require("./router/user")
const blog = require("./router/blog")

// 中间件
app.use(
  bodyParser({
    enableTypes: ["json", "form", "text"]
  })
)
app.use(json())
app.use(logger())

// 日志，记录接收请求到处理完请求的时间
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 注册路由
app.use(user.routes()).use(user.allowedMethods())
app.use(blog.routes()).use(blog.allowedMethods())

module.exports = app
