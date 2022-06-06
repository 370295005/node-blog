const router = require("koa-router")()
const { login, userInfo, register, edit } = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")
const { loginCheck } = require("../middleware")
router.prefix("/user")

router.post("/login", async (ctx, next) => {
  const { username, password } = ctx.request.body
  const res = await login(username, password)
  if (res?.username) {
    ctx.session.username = res.username
    ctx.session.nickname = res.nickname
    ctx.session.id = res.id
    ctx.body = new SuccessModel(
      { username: res.username, id: res.id, nickname: res.nickname },
      "登录成功"
    )
  } else {
    ctx.body = new ErrorModel()
  }
})

// 注册
router.post("/register", async (ctx, next) => {
  const { username, nickname, password } = ctx.request.body
  const res = await register(username, nickname, password)
  ctx.body = new SuccessModel(res, "注册成功")
})

// 获取用户信息
router.get("/userinfo", async (ctx, next) => {
  const { nickname, id } = ctx.request.query
  const res = await userInfo(id, nickname)
  if (res) {
    ctx.body = new SuccessModel(res)
  } else {
    ctx.body = new ErrorModel("网络错误")
  }
})

// 修改信息
router.post("/edit", loginCheck, async (ctx, next) => {
  const username = ctx.session.username
  ctx.request.body.username = username
  const res = await edit(ctx.request.body)
  if (res) {
    ctx.body = new SuccessModel('更新成功')
  } else {
    ctx.body = new ErrorModel("更新失败")
  }
})
module.exports = router
