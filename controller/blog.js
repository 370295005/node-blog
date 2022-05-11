const { exec } = require("../database")

// 获取博客列表
const getList = (author, keyword) => {
  // author且keyword没有值的时候会报错,加上 1=1 
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}'`
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += "order by createtime desc;"
  return exec(sql)
}
// 获取博客详情
const getDetail = id => {
  return {
    id: 1,
    title: "title1",
    content: "content1",
    createTime: 1652172563536,
    author: "nash"
  }
}

// 新建博客
const newBlog = (blogData = {}) => {
  return {
    id: 3
  }
}

// 编辑博客
const updateBlog = (id, blogData = {}) => {
  return false
}

// 删除博客
const deleteBlog = id => {
  return true
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}
