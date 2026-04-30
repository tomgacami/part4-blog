
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response, next) => {
    Blog.find({})
        .then(blogs => {
            response.json(blogs)
        })
        .catch(error => {next(error)})
})

blogsRouter.post('/',(request, response, next) => {

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

    blog
        .save()
        .then(blogSaved => {
            response.status(201).json(blogSaved)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter