const { exec, escape } = require("../mysql")
const { genPassword } = require("../utils/cryp")
const login = async (username, password) => {
  // 密码加密
  password = genPassword(password)
  // 转义
  username = escape(username)
  password = escape(password)
  const sql = `select username,realname from users where username=${username} and password=${password};`
  const result = await exec(sql)
  return result[0]
}

module.exports = {
  login
}
