const _ = require('lodash')


// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  return blogs.reduce((max, blog) => {
    return (max.likes || 0) < blog.likes ? blog : max
  }, {})
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorBlogsCount = _.countBy(blogs, 'author')

  const topAuthor = _.maxBy(
    Object.entries(authorBlogsCount),
    ([, count]) => count
  )

  return {
    author: topAuthor[0],
    blogs: topAuthor[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}