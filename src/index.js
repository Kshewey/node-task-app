const express = require ('express')
require('./db/mongoose')
const User = require('./models/user.js')
const Task = require('./models/task.js')

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())

//endpoint for creating a new user
app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})
//endpoint for getting all users
app.get('/users', async(req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})
//endpoint for getting a user by it's ID
app.get('/users/:id', async (req, res) => {
    const _id = req.params._id

    try {
        const user = await User.findById(_id)
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

//endpoint for updating a user by it's ID

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name' , 'email', 'password', 'age']
    const updateIsValid =  updates.every((update) => allowedUpdates.includes(update))

    if (!updateIsValid) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        
        if (!user) {
            return res.status(404).send()
        }
        res.send(user) 
    } catch (error) {
        res.status(400).send(error)
    }
})


//endpoint to create a new task
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
      await task.save()
      res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }    
})

//end point for fetching all tasks
app.get('/tasks', async (req, res) => {

    try {
        const tasks = Task.find({})
        res.send(tasks)
    } catch(error) {
        res.status(500).send(error)
    }
})

//enpoint for getting a task by ID
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params._id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500),send(error)
    }
})

//endpoin for updating a task by ID

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description' , 'completed']
    const updateIsValid =  updates.every((update) => allowedUpdates.includes(update))

    if (!updateIsValid) {
        
        
        return res.status(400).send({ error: 'Invalid updates!' })
        
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        

        if (!task) {
            

            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(404).send(error)
        

    }
})










app.listen(port, () => {
    console.log('Server is up on port' + port)
})