const express = require("express")
const router = express.Router()

router.get("/list", (req, res, next) => {
  res.json([
    {
      title: "123",
      content: "123123"
    }
  ])
})

module.exports = router