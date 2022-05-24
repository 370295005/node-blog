const Koa = require("./index")
const app = new Koa()

app.use(async (ctx, next) => {
  console.log("123")
  await next()
  console.log("234")
})

app.use(async (ctx, next) => {
  console.log("345")
  await next()
  console.log("456")
})

app.listen(8001)
