

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
})


after (async() => {
    await mongoose.connection.close()
})