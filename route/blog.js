const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require("../controller/blog")
const { SuccessModel, ErrorModel } = require("../model/resModel")
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
    const detailData = getDetail(id)
    return new SuccessModel(detailData)
  }
  // 新建博客
  if (method === "POST" && path === "/api/blog/new") {
    const data = newBlog(req.body)
    return new SuccessModel(data)
  }
  // 更新博客
  if (method === "POST" && path === "/api/blog/update") {
    const result = updateBlog(id, req.body)
    if (result) return new SuccessModel({}, "success")
    else return new ErrorModel({}, "fail")
  }
  // 删除博客
  if (method === "POST" && path === "/api/blog/delete") {
    const result = deleteBlog(id)
    if (result) return new SuccessModel({}, "删除成功")
    else return new ErrorModel({}, "删除失败")
  }
}
module.exports = handleFn
