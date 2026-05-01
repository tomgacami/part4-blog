

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

module.exports = { dummy, totalLikes, favoriteBlog }