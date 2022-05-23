const express = require("./index")

const app = express()

app.use((req, res, next) => {
  console.log(req)
  res.json({ data: "123" })
  next()
})

app.listen(3001)
