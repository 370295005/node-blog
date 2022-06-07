const { exec, escape } = require("../mysql")
const xss = require("xss")
// 获取博客列表
const getList = async (author, keyword, userId) => {
  // author且keyword没有值的时候会报错,加上 1=1
  let sql = `select * from blogs where 1=1 `
  if (author) {
    author = xss(author)
    sql += `and author=${escape(author)}`
  }
  if (keyword) {
    keyword = xss(keyword)
    sql += `and title like ${escape(`%${keyword}%`)} `
  }
  if (userId) {
    userId = xss(userId)
    sql += `and userId=${userId} `
  }
  sql += "order by createTime desc;"
  const res = await exec(sql)
  return res
}
// 获取博客详情
const getDetail = async userId => {
  userId = xss(userId)
  const sql = `select * from blogs where userId=${escape(userId)};`
  const rows = await exec(sql)
  return rows[0]
}

// 新建博客
const newBlog = async (blogData = {}) => {
  let { title, content, userId, bannerImage } = blogData
  // 对尖括号等敏感符号进行转义
  title = xss(title)
  content = xss(content)
  userId = xss(userId)
  bannerImage = xss(bannerImage)
  const createTime = Date.now()
  const sql = `insert into blogs (title,content,userId,createTime,bannerImage) values(${escape(
    title
  )},${escape(content)},${escape(userId)},${escape(createTime)},${escape(
    bannerImage
  )});`
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
const deleteBlog = async (id, userId) => {
  if (id && userId) {
    const sql = `delete from blogs where id=${escape(id)} and userId=${escape(
      userId
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
