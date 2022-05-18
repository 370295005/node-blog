const { exec, escape } = require("../database")

// 获取博客列表
const getList = (author, keyword) => {
  // author且keyword没有值的时候会报错,加上 1=1
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author=${escape(author)}`
  }
  if (keyword) {
    sql += `and title like ${escape(`%${keyword}%`)} `
  }
  sql += "order by createtime desc;"
  return exec(sql)
}
// 获取博客详情
const getDetail = async id => {
  const sql = `select * from blogs where id=${escape(id)};`
  const rows = await exec(sql)
  return rows[0]
}

// 新建博客
const newBlog = async (blogData = {}) => {
  const { title, content, author } = blogData
  const createTime = Date.now()
  const sql = `insert into blogs (title,content,author,createtime) values(${escape(
    title
  )},${escape(content)},${escape(author)},${escape(createTime)});`
  const result = await exec(sql)
  return {
    id: result.insertId
  }
}

// 编辑博客
const updateBlog = async (id, blogData = {}) => {
  const { title, content } = blogData
  const sql = `update blogs set title=${escape(title)},content=${escape(
    content
  )} where id=${escape(id)};`
  const result = await exec(sql)
  return result.affectedRows > 0
}

// 删除博客
const deleteBlog = async (id, author) => {
  if (id && author) {
    const sql = `delete from blogs where id=${escape(id)} and author=${escape(
      author
    )};`
    const result = await exec(sql)
    return result.affectedRows > 0
  } else {
    return false
  }
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}
