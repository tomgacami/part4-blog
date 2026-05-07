

const { test, describe, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const api = supertest(app)

const Blog = require('../models/blog')

describe('testign blogs API', () => {

    test('GET /api/blogs JSON format ', async  () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('return correct number blogs', async () => {

        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, 2)
    })

    test('blog _id field changed to id', async() => {
        const response = await api.get('/api/blogs')
        const blogs = response.body

        blogs.forEach(blog => {
            assert.ok(blog.id)
            assert.ok('id' in blog)
            assert.strictEqual(blog._id, undefined)
        })
    })

    test('Add blog to DB', async() => {

        const responseBefore = await api.get('/api/blogs')
        const blogsBeforePOST = responseBefore.body

        assert.strictEqual(blogsBeforePOST.length, 2)

        const newBlog = {
            title: 'This is a new blog in the DB',
            author: 'From a JR developer',
            url: 'www.thisIsALink.com',
            likes: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)

        const responseAfter = await api.get('/api/blogs')
        const blogsAfterPOST = responseAfter.body
        assert.strictEqual(blogsAfterPOST.length, 3)

        const content = blogsAfterPOST.map(blog => blog.title)
        assert(content.includes('This is a new blog in the DB'))
    })

})


after (async() => {
    await mongoose.connection.close()
})