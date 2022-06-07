const { ErrorModel } = require("../model/resModel")

const loginCheck = async (ctx, next) => {
  const {
    session: { userId }
  } = ctx
  console.log(ctx.session)
  if (userId) {
    await next()
    return
  }
  ctx.body = new ErrorModel("未登录")
}

module.exports = { loginCheck }
