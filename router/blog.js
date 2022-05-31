const router = require("koa-router")()
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require("../controller/blog")
const { loginCheck } = require("../middleware")
const { SuccessModel, ErrorModel } = require("../model/resModel")
router.prefix("/blog")

router.get("/list", async (ctx, next) => {
  const { keyword, author } = ctx.query
  const res = await getList(author, keyword)
  ctx.body = new SuccessModel({ list: res || [] })
})

router.get("/recommend", async (ctx, next) => {
  const { keyword, author } = ctx.query
  const res = await getList(author, keyword)
  ctx.body = new SuccessModel({
    recommendList: res.filter(item => item.recommend) || []
  })
})

router.get("/detail/:id", async (ctx, next) => {
  const { id } = ctx.params
  const res = await getDetail(id)
  ctx.body = new SuccessModel(res || {})
})

router.post("/new", loginCheck, async (ctx, next) => {
  const body = ctx.request.body
  body.author = ctx.session.username
  const res = await newBlog(body)
  ctx.body = new SuccessModel(res)
})

router.post("/update", loginCheck, async (ctx, next) => {
  const { body } = ctx.request
  const { id } = ctx.query
  const res = await updateBlog(id, body)
  if (val) {
    ctx.body = new SuccessModel(res)
  } else {
    ctx.body = new ErrorModel(res)
  }
})

router.post("/delete", loginCheck, async (ctx, next) => {
  const author = ctx.session.username
  const { id } = ctx.query
  const res = await deleteBlog(id, author)
  if (res) ctx.body = new SuccessModel()
  else ctx.body = new ErrorModel()
})

module.exports = router
