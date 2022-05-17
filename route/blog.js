const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require("../controller/blog")

const { SuccessModel, ErrorModel } = require("../model/resModel")

const loginCheck = req => {
  const username = req.session.username
  if (!username) {
    return Promise.resolve(new ErrorModel("尚未登录"))
  }
}

const handleFn = (req, res) => {
  const { path, method, query } = req
  const { id } = query
  // 获取列表
  if (method === "GET" && path === "/api/blog/list") {
    const { author = "", keyword = "" } = query
    const res = getList(author, keyword)
    return res.then(listData => {
      return new SuccessModel(listData, "success")
    })
  }
  // 获取详情
  if (method === "GET" && path === "/api/blog/detail") {
    const res = getDetail(id)
    return res.then(data => {
      return new SuccessModel(data)
    })
  }
  // 新建博客
  if (method === "POST" && path === "/api/blog/new") {
    const loginResult = loginCheck(req)
    // 如果有返回值说明是没登录
    if (loginResult) {
      return loginCheck
    }
    req.body.author = res.session.username
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }
  // 更新博客
  if (method === "POST" && path === "/api/blog/update") {
    const loginResult = loginCheck(req)
    // 如果有返回值说明是没登录
    if (loginResult) {
      return loginCheck
    }
    const result = updateBlog(id, req.body)
    return result.then(value => {
      if (value) return new SuccessModel({}, "更新成功")
      else return new ErrorModel({}, "更新失败")
    })
  }
  // 删除博客
  if (method === "POST" && path === "/api/blog/delete") {
    const loginResult = loginCheck(req)
    // 如果有返回值说明是没登录
    if (loginResult) {
      return loginCheck
    }
    const { author } = req.body
    const result = deleteBlog(id, author)
    return result.then(value => {
      if (value) return new SuccessModel({}, "删除成功")
      else return new ErrorModel({}, "删除失败")
    })
  }
}
module.exports = handleFn
