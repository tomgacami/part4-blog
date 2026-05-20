

const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const api = supertest(app)
const helper = require('../tests/test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const Blog = require('../models/blog')



describe('testing blogs API', () => {

    beforeEach(async() => {
        await Blog.deleteMany({})
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({
            username: `${helper.testUser.username}`,
            passwordHash,
            name: `${helper.testUser.name}`
        })

        const savedUser = await user.save()

        // const user = await User.findOne({ username: helper.testUser.username })

        const blogsDefault = await helper.initialBlogs.map(blog => ({ ...blog, user: savedUser.id.toString() }))

        const blogsToSave = blogsDefault.map(blog => new Blog(blog))

        const promiseArray = blogsToSave.map(blog => blog.save())
        await Promise.all(promiseArray)

    })

    test('GET /api/blogs JSON format', async  () => {

        const loginResponse = await api.post('/api/login').send(helper.testUser)
        const token = `Bearer ${loginResponse.body.token}`

        await api
            .get('/api/blogs')
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type', /application\/json/)

    })

    test('return correct number blogs', async () => {

        const loginResponse = await api.post('/api/login').send(helper.testUser)
        const token = `Bearer ${loginResponse.body.token}`

        const response = await api
            .get('/api/blogs')
            .set('Authorization', token)

        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('blog _id field changed to id', async() => {

        const loginResponse = await api.post('/api/login').send(helper.testUser)
        const token = `Bearer ${loginResponse.body.token}`

        const response = await api
            .get('/api/blogs')
            .set('Authorization', token)

        const blogs = response.body

        blogs.forEach(blog => {
            assert.ok(blog.id)
            assert.ok('id' in blog)
            assert.strictEqual(blog._id, undefined)
        })
    })

    test('Add blog to DB', async() => {

        const loginResponse = await api.post('/api/login').send(helper.testUser)
        const token = `Bearer ${loginResponse.body.token}`


        const responseBefore = await api
            .get('/api/blogs')
            .set('Authorization', token)

        const blogsBeforePOST = responseBefore.body

        assert.strictEqual(blogsBeforePOST.length, helper.initialBlogs.length)

        const newBlog = {
            title: 'This is a new blog in the DB',
            author: 'From a JR developer',
            url: 'www.thisIsALink.com',
            likes: 0,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', token)
            .send(newBlog)
            .expect(201)

        const responseAfter = await api
            .get('/api/blogs')
            .set('Authorization', token)


        const blogsAfterPOST = responseAfter.body
        assert.strictEqual(blogsAfterPOST.length, helper.initialBlogs.length + 1)

        const content = blogsAfterPOST.map(blog => blog.title)
        assert(content.includes('This is a new blog in the DB'))
    })

    test('Property likes not sended', async() => {

        const loginResponse = await api.post('/api/login').send(helper.testUser)
        const token = `Bearer ${loginResponse.body.token}`

        const newBlog = {
            title: 'Without send likes property',
            author: 'Someone',
            url: 'www.bloglist.com'
        }

        await api
            .post('/api/blogs')
            .set('Authorization', token)
            .send(newBlog)
            .expect(201)

        const response = await api
            .get('/api/blogs')
            .set('Authorization', token)

        const body = response.body
        const blog = body.find(blog => blog.title === 'Without send likes property')
        assert.strictEqual(blog.likes, 0)
    })

    test('Try to delete an unexisting blog', async () => {

        const loginResponse = await api.post('/api/login').send(helper.testUser)
        const token = `Bearer ${loginResponse.body.token}`

        const invalidId = '69fe3fce8161efc56904bf83'
        await api
            .delete(`/api/blogs/${invalidId}`)
            .set('Authorization', token)
            .expect(404)
    })

    test('Delete a valid blog', async() => {

        const loginResponse = await api.post('/api/login').send(helper.testUser)
        const token = loginResponse.body.token
        // const user = await User.findOne({ username: helper.testUser.username })
        //
        // await Blog.deleteMany({})
        //
        // const blogsDefault = helper.initialBlogs.map(blog => ({ ...blog, user: user.id.toString() }))
        //
        // const blogsToSave = blogsDefault.map(blog => new Blog(blog))
        //
        // const promiseArray = blogsToSave.map(blog => blog.save())
        // await Promise.all(promiseArray)

        const blogsAtStart =  await helper.blogsInDb()
        const blogsAtStartCount = blogsAtStart.length

        await api
            .delete(`/api/blogs/${blogsAtStart[blogsAtStartCount - 1].id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const responseAfterDelete = await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${token}`)

        const blogsAfterDelete = responseAfterDelete.body

        assert.strictEqual(blogsAfterDelete.length, blogsAtStartCount - 1)
    })

    test('Update an unexisting blog', async() => {

        const loginResponse = await api.post('/api/login').send(helper.testUser)
        const token = `Bearer ${loginResponse.body.token}`

        const invalidId = '69fe3fce8161efc56904bf83'
        await api
            .put(`/api/blogs/${invalidId}`)
            .set('Authorization', token)
            .expect(404)
    })

    test('Update with invalid Id', async() => {

        const loginResponse = await api.post('/api/login').send(helper.testUser)
        const token = `Bearer ${loginResponse.body.token}`

        const invalidId = 'abc123'
        await api
            .put(`/api/blogs/${invalidId}`)
            .set('Authorization', token)
            .expect(400)
    })

    test('Update blog adding like', async () => {

        const loginResponse = await api.post('/api/login').send(helper.testUser)
        const token = `Bearer ${loginResponse.body.token}`

        const response = await api
            .get('/api/blogs')
            .set('Authorization', token)

        const blogs = response.body

        const validId = blogs[0].id
        const preLikesUpdate = blogs[0].likes


        await api
            .put(`/api/blogs/${validId}`)
            .set('Authorization', token)

        const responseAfterUpdate = await api
            .get('/api/blogs')
            .set('Authorization', token)


        const blogsAfterUpdate = responseAfterUpdate.body

        assert.strictEqual(preLikesUpdate + 1, blogsAfterUpdate[0].likes )

    })

})


after (async() => {
    await mongoose.connection.close()
})