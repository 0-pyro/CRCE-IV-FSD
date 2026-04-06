const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Invalid Email']
    },
    age: {
        type: Number,
        min: 0,
        max: 120
    },
    hobbies: {
        type: [String],
    },
    bio: {
        type: String
    },
    userId: {
        type: String,
        unique: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.index({ email: 1, age: -1 })
userSchema.index({ hobbies: 1 })
userSchema.index({ bio: 'text' })
userSchema.index({ userId: 'hashed' })
userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2582000 })

module.exports = mongoose.model('User', userSchema)