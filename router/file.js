const router = require("koa-router")()
const { uploadFile } = require("../controller/file")
const { SuccessModel, ErrorModel } = require("../model/resModel")
const upload = require("../config/storge")
router.prefix("/file")

router.post("/upload", upload.single("file"), async (ctx, next) => {
  const res = await uploadFile(ctx.req.file.filename)
  if (res) ctx.body = new SuccessModel({ imagePath: res }, "上传成功")
  else ctx.body = new ErrorModel("上传失败")
})

module.exports = router
