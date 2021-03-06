const redis = require("redis")
const { PORT, HOST, PASSWORD } = require("../config/redis")

const redisClient = redis.createClient(PORT, HOST)

redisClient.auth(PASSWORD, () => {
  console.log("连接至redis")
})

redisClient.on("error", err => {
  console.error(err)
})

function set(key, value) {
  console.log(key, value)
  if (typeof value === "object") {
    val = JSON.stringify(value)
  }
  redisClient.set(key, val, redis.print)
}

function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      try {
        resolve(JSON.parse(val))
      } catch (err) {
        resolve(val)
      }
    })
  })
}

module.exports = { set, get }
