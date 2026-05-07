

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
            .get('/bloglist/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('return correct number blogs', async () => {

        const response = await api.get('/bloglist/api/blogs')
        assert.strictEqual(response.body.length, 2)
    })

    test('blog _id field changed to id', async() => {
        const response = await api.get('/bloglist/api/blogs')
        const blogs = response.body

        blogs.forEach(blog => {
            assert.ok(blog.id)
            assert.ok('id' in blog)
            assert.strictEqual(blog._id, undefined)
        })
    })

})


after (async() => {
    await mongoose.connection.close()
})