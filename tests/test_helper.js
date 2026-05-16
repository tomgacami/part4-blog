
const User = require('../models/user')
const Blog = require('../models/blog')

const initialBlogs =  [
                {
                    title: 'First title',
                    author: 'Author 1',
                    url: 'www.google.com',
                    likes: 0
                },
                {
                    title: 'Second title',
                    author: 'Author 1',
                    url: 'www.hotmail.com',
                    likes: 1
                },
                {
                    title: 'Third title',
                    author: 'Author 2',
                    url: 'www.yahoo.com',
                    likes: 3
                }
            ]


const usersInDb = async () => {

    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const blogsInDb = async() => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = { usersInDb, initialBlogs, blogsInDb }