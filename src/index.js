const express = require ('express')
require('./db/mongoose')
const User = require('./models/user.js')
const Task = require('./models/task.js')

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())

//endpoint for creating a new user
app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((error) => {
        //change the status code then send error
        res.status(400).send(error)
    })
})
//endpoint for getting all users
app.get('/users', (req, res) => {
    User.find({ }).then((users) => {
        res.send(users)
    }).catch((error) => {
        res.status(500).send()
    })
})
//endpoint for getting a user by it's ID
app.get('/users/:id', (req, res) => {
    const _id = req.params._id

    User.findById(_id).then((user) => {
        if(!user) {
            return res.status(404).send()
        }

        res.send(user)
    }).catch((error) => {
        res.status(500).send()
    })

    console.log(req.params)
})
//endpoint to create a new task
app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

//end point for fetching all tasks
app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((error) => {
        res.status(500).send()
    })
})

//enpoint for getting a task by ID
app.get('/tasks/:id', (req, res) => {
    const _id = req.params._id

    Task.findById(_id).then((task) => {
        if(!task) {
            return res.status(404).chunkedEncoding()
        }
        res.send(task)
    }).catch((error) => {
        res.status(500),send()
    })
})







app.listen(port, () => {
    console.log('Server is up on port' + port)
})