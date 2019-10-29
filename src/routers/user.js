const express = require('express')
const User = require('../models/user')
const router = new express.Router()








//endpoint for creating a new user
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})
//endpoint for getting all users
router.get('/users', async(req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})
//endpoint for getting a user by it's ID
router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
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


// endpoint to delete user
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router