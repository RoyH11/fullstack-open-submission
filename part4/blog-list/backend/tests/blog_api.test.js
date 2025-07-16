const assert = require(test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  console.log('Response body length:', response.body.length)
  console.log('Expected length:', test_blogs.blogs.length)
  console.log('First blog in response:', response.body[0]?.title)
  assert.strictEqual(response.body.length, test_blogs.blogs.length)
})assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const test_blogs = require('./test_blogs')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(test_blogs.blogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  // console.log(response.body.length)
  // console.log(test_blogs.blogs.length)
  assert.strictEqual(response.body.length, test_blogs.blogs.length)
})

after(async () => {
  await mongoose.connection.close()
})