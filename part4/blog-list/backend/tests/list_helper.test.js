const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { blogs, listWithOneBlog, tiedLikesBlogs } = require('./test_blogs')

// testing the dummy function
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})


// testing the totalLikes function
describe('total likes', () => {

  test('when list is empty, equals zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has multiple blogs, equals the likes of all', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36)
  })
})


// testing the favoriteBlog function
describe('favorite blog', () => {

  test('when list is empty, returns null', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, returns that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  })

  test('when list has multiple blogs, returns the blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    const expected = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    }
    assert.deepStrictEqual(result, expected)
  })

  test('when multiple blogs have the same number of likes, returns the first one found', () => {
    const result = listHelper.favoriteBlog(tiedLikesBlogs)
    assert.deepStrictEqual(result, tiedLikesBlogs[0])
  })
})


// testing the mostBlogs function
describe('most blogs', () => {

  test ('when list is empty, returns null', () => {
    const result = listHelper.mostBlogs([])
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, returns that author with one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    const expected = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }
    assert.deepStrictEqual(result, expected)
  })

  test('when list has multiple blogs, returns the author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    assert.deepStrictEqual(result, expected)
  })

  test('when multiple authors have the same number of blogs, returns the first one found', () => {
    const result = listHelper.mostBlogs(tiedLikesBlogs)
    const expected = {
      author: 'Robert C. Martin',
      blogs: 1
    }
    assert.deepStrictEqual(result, expected)
  })
})