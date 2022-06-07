const { exec, escape } = require("../mysql")
const xss = require("xss")
const { genPassword } = require("../utils/cryp")

const login = async (username, password) => {
  // 密码加密
  password = genPassword(password)
  // 转义
  username = escape(username)
  password = escape(password)
  const sql = `select username,nickname,userId from users where username=${username} and password=${password};`
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

const userInfo = async (userId, nickname) => {
  let sql = `select userId,nickname,description,avatar from users where 1=1 `
  if (userId) {
    userId = escape(userId)
    sql += `and userId=${userId} `
  }
  if (nickname) {
    nickname = escape(nickname)
    sql += `and nickname=${nickname}`
  }
  console.log(sql)
  const result = await exec(sql)
  if (userId || nickname) {
    return result[0]
  } else {
    return {}
  }
}

const edit = async userInfo => {
  let { nickname, description, avatar, userId } = userInfo
  nickname = escape(xss(nickname))
  description = escape(xss(description))
  avatar = escape(avatar)
  userId = escape(userId)
  const sql = `update users set nickname=${nickname},description=${description},avatar=${avatar} where userId=${userId}`
  console.log(sql)
  const result = await exec(sql)
  return result.affectedRows > 0
}

module.exports = {
  login,
  userInfo,
  register,
  edit
}
