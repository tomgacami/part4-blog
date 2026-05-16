

const { test, describe, after } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('../tests/test_helper')


// beforeEach( async () => {
//     await User.deleteMany({})
//
//     const passwordHash = await bcrypt.hash('sekret', 10)
//     const user = new User({
//         username: 'rooter',
//         passwordHash,
//         name: 'root'
//     })
//
//     await user.save()
// })


describe('POST /api/blogs', async () => {

    test('try to create user with no username', async () => {

        const usersAtStart = helper.usersInDb()

        const newUser = {
            username: '',
            password: 'secret',
            name: 'Mike'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = helper.usersInDb()

        assert(result.body.error.includes(`\`username\` is required`))
        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    test('try to create user with no password', async () => {

        const usersAtStart = helper.usersInDb()

        const newUser = {
            username: 'Mikelins',
            name: 'Mike',
            password: ''
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = helper.usersInDb()

        assert(result.body.error.includes('Password must be at least 3 characters'))
        assert.strictEqual(usersAtStart.length, usersAtEnd.length)

    })

    test('try to create user with username less then 3 characters', async () => {
        const usersAtStart = helper.usersInDb()

        const newUser = {
            username: 'AL',
            password: 'secret',
            name: 'Mike'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = helper.usersInDb()

        assert(result.body.error.includes('Username must be at least 3 characters'))
        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    test('try to create user with password less then 3 characters', async () => {
        const usersAtStart = helper.usersInDb()

        const newUser = {
            username: 'Mikelins',
            name: 'Mike',
            password: 'MI'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = helper.usersInDb()

        assert(result.body.error.includes('Password must be at least 3 characters'))
        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    test('try to create user with a username already taken', async () => {

        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({
            username: 'rooter',
            passwordHash,
            name: 'root'
        })
        await user.save()

        const usersAtStart = helper.usersInDb()

        const newUser = {
            username: 'rooter',
            password: 'secret',
            name: 'Mike'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = helper.usersInDb()

        assert(result.body.error.includes(`expected 'username' to be unique`))
        assert.strictEqual(usersAtStart.length, usersAtEnd.length)

    })
})


after (async () => {
    await mongoose.connection.close()
})