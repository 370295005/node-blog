const router = require("koa-router")()
const { login, userInfo } = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")
router.prefix("/user")

router.post("/login", async (ctx, next) => {
  const { username, password } = ctx.request.body
  const res = await login(username, password)
  if (res?.username) {
    ctx.session.username = res.username
    ctx.session.nickname = res.nickname
    ctx.body = new SuccessModel("登录成功")
  } else {
    ctx.body = new ErrorModel()
  }
})

// 获取用户信息
router.get("/userinfo", async (ctx, next) => {
  const { username, id } = ctx.request.query
  const res = await userInfo(id, username)
  if (res) {
    ctx.body = new SuccessModel(res)
  } else {
    ctx.body = new ErrorModel("网络错误")
  }
})
module.exports = router
