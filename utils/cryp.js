const crypto = require("crypto")

// 密匙
const SECRET_KEY = "114Nash_Iwnl*514"

// md5
function md5(content) {
  let md5 = crypto.createHash("md5")
  // 把输出变成十六进制
  return md5.update(content).digest("hex")
}

// 加密函数
function genPassword(password) {
  const str = `password=${password}&key=${SECRET_KEY}`
  return md5(str)
}

module.exports = { genPassword }
