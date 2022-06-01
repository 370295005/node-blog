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

const register = async (username, nickname, password) => {
  // 密码加密
  password = genPassword(password)
  // 转义
  username = escape(username)
  password = escape(password)
  nickname = escape(nickname)
  const sql = `insert into users (username,password,nickname) values(${username},${password},${nickname});`
  const result = await exec(sql)
  return result.affectedRows > 0
}

const userInfo = async (id, nickname) => {
  let sql = `select id,nickname,description,avatar from users where 1=1 `
  if (id) {
    id = escape(id)
    sql += `and id=${id} `
  }
  if (nickname) {
    nickname = escape(nickname)
    sql += `and nickname=${nickname}`
  }
  const result = await exec(sql)
  if (id || nickname) {
    return result[0]
  } else {
    return {}
  }
}

module.exports = {
  login,
  userInfo,
  register
}
