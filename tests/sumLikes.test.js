
const { test, describe } = require('node:test')
const assert =require('node:assert')


const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require("../utils/list_helper").favoriteBlog
const mostBlogs =require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes

describe('total likes', () => {
    test('with empty blogs should be 0', () => {
        assert.strictEqual(totalLikes(emptyBlogs),0)
    })

    test('with only one blog', () => {
        assert.strictEqual(totalLikes(listWithOneBlog),5)
    })

    test ('when list of blogs', () => {
        const result = totalLikes(blogs)
        assert.strictEqual(result, 41)
    })


})

describe ('blog with more likes', () => {

    test('with empty blogs', () => {
        assert.deepStrictEqual(favoriteBlog(emptyBlogs),{ likes:0 })
    })

    test('and only one blog', () => {
        assert.deepStrictEqual(favoriteBlog(listWithOneBlog),{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        })
    })

    test('with more likes in a list of blogs',() => {
        const result = favoriteBlog(blogs)
         assert.deepStrictEqual(result, {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        })
    })
})

describe('most blogs wrote', () => {

    test('with empty blogs',() => {
        const result = mostBlogs(emptyBlogs)
        assert.strictEqual(result, 0)
    })

    test('with only one blog',() => {
        const result = mostBlogs(listWithOneBlog)
        assert.deepStrictEqual(result, {
            "author": "Edsger W. Dijkstra",
            "blogs": 1
        })
    })

    test('with a list of blogs',() => {
        const result = mostBlogs(blogs)
        assert.deepStrictEqual(result, {
            "author": "Edsger W. Dijkstra",
            "blogs": 3
        })
    })

})

describe('most likes author with', () => {

    test('empty blog',() => {
        const result = mostLikes(emptyBlogs)
        assert.deepStrictEqual(result,[])
    })

    test('list only one blog',() => {
        const result = mostLikes(listWithOneBlog)
        assert.deepStrictEqual(result,[{
            "author": "Edsger W. Dijkstra",
            "likes": 5,
        }])
    })

    test('a list of blogs', () => {
        const result = mostLikes(blogs)
        assert.deepStrictEqual(result, [
            {
                "author": "Edsger W. Dijkstra",
                "likes": 22
            },
            {
                "author": "Michael Chan",
                "likes": 7
            },
            {
                "author": "Robert C. Martin",
                "likes": 12
            }
        ])
    })




})

const emptyBlogs = []

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    }
]

const blogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    }
    ,
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }

]