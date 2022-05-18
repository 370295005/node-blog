const mysql = require("mysql")
const config = require("../config/database")

// 连接对象
const connect = mysql.createConnection(config)

// 连接
connect.connect()

// 执行sql函数
function exec(sql) {
  return new Promise((resolve, reject) => {
    connect.query(sql, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

// 关闭连接
function closeConnect() {
  connect.end()
}

module.exports = { exec, closeConnect, escape: mysql.escape }
