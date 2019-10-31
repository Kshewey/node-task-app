const express = require('express')
const Task = require('../models/task')
const router = new express.Router()





//endpoint to create a new task
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
      await task.save()
      res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }    
})

//end point for fetching all tasks
router.get('/tasks', async (req, res) => {

    try {
        const tasks = Task.find({})
        res.send(tasks)
    } catch(error) {
        res.status(500).send(error)
    }
})

//enpoint for getting a task by ID
router.get('/tasks/:id', async (req, res) => {
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

//endpoint for updating a task by ID

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description' , 'completed']
    const updateIsValid =  updates.every((update) => allowedUpdates.includes(update))

    if (!updateIsValid) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
    const task = await Task.findByIdAndUpdate(req.params.id)

        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        updates.forEach((update) => {
            task[update] = req.body[update]
        })

        await task.save()
        
        if (!task) {
        
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
        
}
})

// endpoiint for deleting task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router

