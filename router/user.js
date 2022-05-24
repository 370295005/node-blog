const router = require("koa-router")()
const { login } = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")
router.prefix("/user")

router.post("/login", async (ctx, next) => {
  const { username, password } = ctx.request.body
  const res = await login(username, password)
  if (res?.username) {
    ctx.session.username = res.username
    ctx.session.realname = res.realname
    ctx.body = new SuccessModel("登录成功")
  } else {
    ctx.body = new ErrorModel()
  }
})

module.exports = router
