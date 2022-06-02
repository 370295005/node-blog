const multer = require("koa-multer")
const path = require("path")
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../public/images")
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    // 设置上传文件名称
    let fileName = Date.now() + path.extname(file.originalname)
    // 设置名称
    cb(null, fileName)
  }
})

module.exports = multer({ storage })
