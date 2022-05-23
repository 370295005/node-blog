const router = require("koa-router")()
router.prefix("/blog")

router.get("/list", async (ctx, next) => {
  const { query } = ctx.query
  ctx.body = {
    list: [{ title: "123" }]
  }
})

router.get("/detail/:id", async (ctx, next) => {
  const { id } = ctx.params
  ctx.body = {
    id
  }
})
module.exports = router
