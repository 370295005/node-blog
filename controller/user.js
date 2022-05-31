const { exec, escape } = require("../mysql")
const xss = require("xss")
const { genPassword } = require("../utils/cryp")

const login = async (username, password) => {
  // 密码加密
  password = genPassword(password)
  // 转义
  username = escape(username)
  password = escape(password)
  const sql = `select username,nickname from users where username=${username} and password=${password};`
  const result = await exec(sql)
  return result[0] || {}
}

const userInfo = async (id, nickname) => {
  id = xss(id)
  nickname = xss(nickname)
  let sql = `select id,nickname,description,avatar from users where 1=1 `
  if (id) {
    sql += `and id=${id}`
  }
  if (nickname) {
    sql += `and username=${nickname}`
  }
  const result = await exec(sql)
  return result[0] || []
}

module.exports = {
  login,
  userInfo
}
