const { login } = require("../controller/user")
const { set } = require("../redis")
const { SuccessModel, ErrorModel } = require("../model/resModel")

const handleFn = async (req, res) => {
  const { method, path } = req
  if (method === "POST" && path === "/api/user/login") {
    const { username, password } = req.body
    const data = await login(username, password)
    if (data?.username) {
      req.session.username = data.username
      req.session.realname = data.realname
      console.log(data)
      // 同步到redis
      set(req.sessionId, req.session)
      return new SuccessModel("登陆成功")
    } else return new ErrorModel("登录失败")
  }

  // if (method === "GET" && path === "/api/user/login-test") {
  //   return Promise.resolve(new SuccessModel(req.cookie.username))
  // }
}
module.exports = handleFn
