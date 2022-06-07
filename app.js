const Koa = require("koa")
const app = new Koa()
const path = require("path")
const static = require("koa-static")
const koaBody = require("koa-body")
const cors = require("koa2-cors")
const json = require("koa-json")
const bodyParser = require("koa-bodyparser")
const logger = require("koa-logger")
const session = require("koa-generic-session")
const redisStore = require("koa-redis")
const morgan = require("koa-morgan")
const { redisConfig } = require("./redis")
const { accessWriteStream } = require("./utils/log")

const env = process.env.NODE_ENV
// cookie过期时间默认一天
const cookieMaxAge = 24 * 60 * 60 * 1000
const sessionStore = 1

// 路由
const user = require("./router/user")
const blog = require("./router/blog")
const file = require("./router/file")

// 中间件
// 允许上传图片
app.use(static(path.join(__dirname, "./public")))
app.use(
  cors({
    origin:
      env === "development"
        ? "http://localhost:3070"
        : "https://www.nash141.cloud",
    credentials: true
  })
)
app.use(
  bodyParser({
    enableTypes: ["json", "form", "text"]
  })
)
app.use(json())
app.use(logger())

// 日志，记录接收请求到处理完请求的时间3
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(
  morgan(env === "production" ? "combined" : "dev", {
    stream: accessWriteStream
  })
)

// session配置
app.keys = ["1145Nash_iwnl?14"]
app.use(
  session({
    cookie: {
      path: "/",
      httpOnly: false,
      maxAge: cookieMaxAge,
      domain: env === "development" ? "localhost" : "nash141.cloud",
      secure: false,
      sameSite: false
    },
    store: redisStore(redisConfig)
  })
)

// 注册路由
app.use(user.routes()).use(user.allowedMethods())
app.use(blog.routes()).use(blog.allowedMethods())
app.use(file.routes()).use(file.allowedMethods())

module.exports = app
