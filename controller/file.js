const { exec, escape } = require("../mysql")
const xss = require("xss")
const env = process.env.NODE_ENV
const host =
  env === "development" ? "http://localhost:8000/images" : "http://api.nash141.cloud/images"
// 上传图片
const uploadFile = filename => {
  let url = ""
  if (filename) {
    url = `${host}/${filename}`
  }
  return Promise.resolve(url)
}

module.exports = {
  uploadFile
}
