// 实现简易express
const http = require("http")
const slice = Array.prototype.slice

class Express {
  constructor() {
    // 中间件的列表
    this.routes = {
      all: [],
      get: [],
      post: []
    }
  }
  register(path) {
    const info = {}
    // 如果path不是一个路径则，默认为全局中间件
    if (typeof path === "string") {
      info.path = path
      // 中间件函数的数组 从第二个参数开始取
      info.stack = slice.call(arguments, 1)
    } else {
      info.path = "/"
      // 从第一个参数开始取
      info.stack = slice.call(arguments, 0)
    }
    return info
  }
  use() {
    const info = this.register.apply(this, arguments)
    this.routes.all.push(info)
  }
  get() {
    const info = this.register.apply(this, arguments)
    this.routes.get.push(info)
  }
  post() {
    const info = this.register.apply(this, arguments)
    this.routes.post.push(info)
  }
  match(method, url) {
    let stack = []
    if (url === "/favicon.ico") {
      return stack
    }
    let currentRoutes = []
    currentRoutes = [
      ...currentRoutes,
      ...this.routes.all,
      ...this.routes[method]
    ]
    currentRoutes.forEach(item => {
      // 匹配路径 url = '/api/list' path = '/api'
      if (url.indexOf(item.path) === 0) {
        stack = [...stack, ...item.stack]
      }
    })
    return stack
  }
  handle(req, res, stack) {
    const next = () => {
      const middleware = stack.shift()
      if (middleware) {
        // 执行中间件函数
        middleware(req, res, next)
      }
    }
    next()
  }
  callback() {
    return (req, res) => {
      res.json = data => {
        res.setHeader("Content-type", "application/json")
        res.end(JSON.stringify(data))
      }
      const url = req.url
      const method = req.method.toLowerCase()
      const resultList = this.match(method, url)
      this.handle(req, res, resultList)
    }
  }
  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

module.exports = () => new Express()
