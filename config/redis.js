const redis = require("redis")
const env = process.env.NODE_ENV
const PORT = 6379
const PASSWORD = "123456"
const HOST = env !== "production" ? "203.195.212.95" : "127.0.0.1"

const REDIS_CONFIG = {
  PORT,
  HOST,
  PASSWORD
}

module.exports = REDIS_CONFIG