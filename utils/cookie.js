// 获取cookie过期时间,默认一天
const getCookieExpire = (day = 1) => {
  const date = new Date()
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * day)
  return date.toGMTString()
}

module.exports = {
  getCookieExpire
}
