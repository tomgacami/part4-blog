
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: [4, 'Username must be at least 4 characters'],
        match: [
            /^[a-zA-Z0-9._-]+$/,
            'Username is not valid. Only letters, numbers and symbols are allowed "-", "_", "."'
        ]
    },

    name: {
        type: String,
        match: [
            /^[a-zA-Z. -]+$/,
            'Name is not valid, Only letters and symbols are allowed "-", ".".'
        ]
    },
    passwordHash: String,

    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }],
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})


const User = mongoose.model('User', userSchema)

module.exports = User