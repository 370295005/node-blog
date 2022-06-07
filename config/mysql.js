const env = process.env.NODE_ENV
const LOCAL_HOST = "localhost"
const HOST = "203.195.212.95"
const PORT = "3306"
const USER = "root"
const PASSWORD = "123456"
const DATABASE = "blog"
const TEST_DATABASE = "test_blog"
const MYSQL_CONFIG = {
  host: HOST,
  port: PORT,
  user: USER,
  password: PASSWORD
}

if (env !== "production") {
  MYSQL_CONFIG.database = TEST_DATABASE
} else {
  MYSQL_CONFIG.host = LOCAL_HOST
  MYSQL_CONFIG.database = DATABASE
}

module.exports = MYSQL_CONFIG
