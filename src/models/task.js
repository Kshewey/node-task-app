const mongoose = require('mongoose')

// model for a task (JavaScript constructor function) - invoke this to make a new user
const Task = mongoose.model("Task", {
    description: {
        type: String,
        trim: true,
        required: true
        
    }, 
    completed: {
        type: Boolean,
        default: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }
})
module.exports = Task