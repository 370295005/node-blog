const { ErrorModel } = require("../model/resModel")

const loginCheck = async (ctx, next) => {
  const {
    session: { username }
  } = ctx
  console.log(ctx.session)
  if (username) {
    await next()
    return
  }
  ctx.body = new ErrorModel("未登录")
}

module.exports = { loginCheck }
