const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})


test('blog posts have id property instead of _id', async () => {
  const response = await api.get('/api/blogs')

  const blogs = response.body
  assert(blogs.length > 0) // Ensure there are blogs to check

  blogs.forEach(blog => {
    assert(blog.id !== undefined, 'Blog should have id property')
    assert(blog._id === undefined, 'Blog should not have _id property')
  })
})

describe('creating new blogs', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Fullstack Open Submission',
      author: 'Roy Huang',
      url: 'https://github.com/RoyH11/fullstack-open-submission',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    assert(titles.includes(newBlog.title), 'New blog title should be in the list')
  })


  test('if likes are not defined, defaults to 0', async () => {
    const newBlog = {
      title: 'Blog without likes',
      author: 'Roy Huang',
      url: 'https://example.com/blog-without-likes',
    // Note: no likes property
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = blogsAtEnd.find(blog => blog.title === newBlog.title)
    assert(addedBlog !== undefined, 'Added blog should be in the list')
    assert.strictEqual(addedBlog.likes, 0, 'Likes should default to 0')
  })


  test('blog without title is not added', async () => {
    const newBlog = {
      // Intentionally missing title
      author: 'Roy Huang',
      url: 'https://example.com/blog-without-title',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length, 'No new blog should be added')
    const titles = blogsAtEnd.map(blog => blog.title)
    assert(!titles.includes(newBlog.title), 'Blog without title should not be in the list')
  })


  test('blog without url is not added', async () => {
    const newBlog = {
      title: 'Blog without URL',
      author: 'Roy Huang',
      // Intentionally missing url
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length, 'No new blog should be added')
    const titles = blogsAtEnd.map(blog => blog.title)
    assert(!titles.includes(newBlog.title), 'Blog without URL should not be in the list')
  })


  test('blog without title and url is not added', async () => {
    const newBlog = {
      // Intentionally missing title and url
      author: 'Roy Huang',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length, 'No new blog should be added')
    const titles = blogsAtEnd.map(blog => blog.title)
    assert(!titles.includes(newBlog.title), 'Blog without title and URL should not be in the list')
  })
})


after(async () => {
  await mongoose.connection.close()
})