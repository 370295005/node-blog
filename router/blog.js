const express = require("express")
const router = express.Router()
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require("../controller/blog")
const { loginCheck } = require("../middleware")
const { SuccessModel, ErrorModel } = require("../model/resModel")

// 获取博客列表
router.get("/list", async (req, res, next) => {
  const { author, keyword } = req.query
  const result = await getList(author, keyword)
  res.json(new SuccessModel(result, "success"))
})

// 获取博客详情
router.get("/detail", async (req, res, next) => {
  const { id } = req.query
  const result = getDetail(id)
  const data = await result
  res.json(new SuccessModel(data))
})

// 新建博客
router.post("/new", loginCheck, async (req, res, next) => {
  const author = req.session.username
  req.body.author = author
  const result = newBlog(req.body)
  const data = await result
  res.json(new SuccessModel(data, "创建成功"))
})

// 更新博客
router.post("/update", loginCheck, async (req, res, next) => {
  const author = req.session.username
  req.body.author = author
  const result = updateBlog(req.body)
  const data = await result
  res.json(new SuccessModel(data, "更新成功"))
})

// 删除博客
router.post("/delete", loginCheck, async (req, res, next) => {
  const author = req.session.username
  const id = req.query.id
  const result = deleteBlog(id, author)
  const data = await result
  if (data) {
    res.json(new SuccessModel("删除成功"))
  } else {
    res.json(new ErrorModel("删除失败"))
  }
})
module.exports = router
