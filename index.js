const handleBlogFn = require("./route/blog")
const handleUserFn = require("./route/user")
const { getCookieExpire } = require("./utils/cookie")
const { set, get } = require("./redis")
const http = require("http")
const qs = require("querystring")
const PORT = 8000
const SESSION = {}

// 处理postData
const getPostData = req => {
  return new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({})
      return
    }
    if (req.headers["content-type"] !== "application/json") {
      resolve({})
      return
    }
    let postData = ""
    req.on("data", chunk => {
      postData += chunk.toString()
    })
    req.on("end", () => {
      // 没有数据
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
}

const server = http.createServer(async (req, res) => {
  const { url } = req
  const path = url.split("?")[0]
  const query = url.split("?")[1]
  let needSetCookie = false
  res.setHeader("Content-type", "application/json")
  req.query = qs.parse(query)
  req.path = path
  req.cookie = {}

  const cookieStr = req.headers.cookie || ""
  cookieStr.split(";").forEach(item => {
    const arr = item.split("=")
    const [key, value] = arr
    req.cookie[key.trim()] = value
  })

  // 解析session
  let userId = req.cookie.userId
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    set(userId, {})
  }

  // 获取session
  req.sessionId = userId
  const sessionData = await get(req.sessionId)
  if (!sessionData) {
    // 初始化redis中的session
    set(req.sessionId, {})
    // 设置session
    req.session = {}
  } else {
    req.session = sessionData
  }
  // let { userId = "" } = req.cookie
  // if (userId) {
  //   if (!SESSION[userId]) {
  //     SESSION[userId] = {}
  //   }
  //   req.session = SESSION[userId]
  // } else {
  //   needSetCookie = true
  //   userId = `${Date.now()}_${Math.random()}}`
  //   SESSION[userId] = {}
  // }
  // req.session = SESSION[userId]

  getPostData(req).then(postData => {
    req.body = postData

    const blogRes = handleBlogFn(req, res)
    if (blogRes) {
      blogRes.then(blogData => {
        if (needSetCookie) {
          res.setHeader(
            "Set-Cookie",
            `userId=${userId}; path=/; expires=${getCookieExpire(1)}; httpOnly`
          )
        }
        res.end(JSON.stringify(blogData))
      })
      return
    }

    const userRes = handleUserFn(req, res)
    if (userRes) {
      userRes.then(userData => {
        if (needSetCookie) {
          res.setHeader(
            "Set-Cookie",
            `userId=${userId}; path=/; expires=${getCookieExpire(1)}; httpOnly`
          )
        }
        res.end(JSON.stringify(userData))
      })
      return
    }

    res.writeHead(404, {
      "Content-type": "text/plain"
    })
    res.write("404 Not Found")
    res.end()
  })
})

server.listen(PORT)
