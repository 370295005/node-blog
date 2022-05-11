const env = process.env.NODE_ENV
const handleBlogFn = require("./route/blog")
const handleUserFn = require("./route/user")
const http = require("http")
const qs = require("querystring")
const PORT = 8000
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
const server = http.createServer((req, res) => {
  const { method, url } = req
  const path = url.split("?")[0]
  res.setHeader("Content-type", "application/json")
  req.query = qs.parse(path)
  req.path = path
  getPostData(req).then(postData => {
    req.body = postData
    const blogRes = handleBlogFn(req, res)
    if (blogRes) {
      blogRes.then(blogData => {
        res.end(JSON.stringify(blogData))
      })
      return
    }
    const userData = handleUserFn(req, res)
    if (userData) {
      res.end(JSON.stringify(userData))
      return
    }
    res.writeHead(404, {
      "Content-type": "text/plain"
    })
    res.write("404 Not Found")
    res.end()
  })
})

server.listen(PORT, () => {
  console.log(`listen on ${PORT}`)
})
