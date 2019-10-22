const mongoose = require('mongoose')
const validator = require('validator')

// model for a user (JavaScript constructor function) - invoke this to make a new user
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        // validator NPM package validation (is this a valid email address)
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid')
            }
        }
    } ,
    password: {
        type: String,
        required: true,
        trim: true, 
        minlength: 7,
        
        validate(value) {
            if (value.toLowerCase().includes('password')) {
            throw new Error('Password cannot contain "Password"')
        }
    }
    },
    age: {
        type: Number,
        default: 0,
        //custom mongoose validation (is this age a positive number)
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }
})

module.exports = User