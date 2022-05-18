const { exec, escape } = require("../database")
const login = async (username, password) => {
  username = escape(username)
  password = escape(password)
  const sql = `select username,realname from users where username=${username} and password=${password};`
  const result = await exec(sql)
  return result[0]
}

module.exports = {
  login
}
