
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async(request, response) => {

    const body = request.body

    if (!body.title || !body.author || !body.url ){
        return response.status(400).json({ error: 'All fields must be fulled' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: 0
    })

    const newBlogSaved = await blog.save()
    response.status(201).json(newBlogSaved)
})

module.exports = blogsRouter