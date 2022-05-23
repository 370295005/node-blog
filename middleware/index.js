const { ErrorModel } = require("../model/resModel")

const loginCheck = (req, res, next) => {
  const { cookies } = req
  const sid = cookies["connet.sid"]
  if (sid) {
    next()
  } else {
    res.json(new ErrorModel("未登录"))
  }
}

module.exports = { loginCheck }
