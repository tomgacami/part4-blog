
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async(request, response) => {

    const body = request.body

    if (!body.title || !body.author || !body.url ){
        //ALREADY DONE IN THE NEXT LINE
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

blogsRouter.delete('/:id', async (request, response) => {

    const blog = await Blog.findById(request.params.id)

    if(!blog){
        return response.status(404).json({ message: 'Blog not found' })
    }
    await Blog.findByIdAndDelete(request.params.id)
    // response.status(200).json({ error: 'Blog deleted successfully' })
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {

    const find = await Blog.findById(request.params.id)

    if(!find){
        return response.status(404).json({ error: 'Blog not found' })
    }

    const blog = {
        title: find.title,
        author: find.author,
        url: find.url,
        likes: (find.likes) + 1
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { returnDocument: 'after' })
    response.status(200).json(updatedBlog)
})


module.exports = blogsRouter