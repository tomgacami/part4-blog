
var lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes =(blogs ) => {

    return blogs.reduce(
            (sum,  blog ) =>
                sum + blog.likes  ,0)
}

const favoriteBlog = (blogs) => {

    let maxLikes = { likes:0 }
    blogs.forEach(blog => {
        if( blog.likes > maxLikes.likes ) {
            maxLikes = blog
        }
    })
    return maxLikes
}

const mostBlogs=(blogs) => {

    if (blogs.length === 0){
        return 0
    }

    const counted = lodash.countBy(blogs, 'author' )
    const objectsWithFields = Object.entries(counted).map(([author, blogs]) => ({ author, blogs }))
    const authorMostBlogs = lodash.maxBy(objectsWithFields, blogs)

    return authorMostBlogs
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }