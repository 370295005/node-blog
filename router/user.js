const express = require("express")
const router = express.Router()
const { login } = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body
  const result = login(username, password)
  const data = await result
  if (data?.username || "") {
    req.session.username = data.username
    req.session.nickname = data.nickname
    res.json(
      new SuccessModel({ username: data.username, nickname: data.nickname })
    )
    return
  }
  res.json(new ErrorModel())
})

module.exports = router
