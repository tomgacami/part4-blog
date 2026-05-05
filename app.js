
const express = require('express')
const app = express()
const config = require('./utils/config')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)

logger.info('connecting to ', config.MONGODB_URI)

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to Mongo DB')
    })
.catch(error => {
    logger.error('error connecting to Mongo DB: ', error.message)
})

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use('/bloglist/api/blogs', blogsRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)



module.exports = app