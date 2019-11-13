const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth.js')
const {sendWelcomeEmail, sendCancelEmail} = require('../emails/account')

const router = new express.Router()








//endpoint for creating a new user
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()

        res.status(201).send({ user, token} )
    } catch (error) {
        res.status(400).send(error)
    }
})

// endpoint for user logging in

router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password) 
        const token = await user.generateAuthToken()
        res.send( { user, token})
    } catch (error) {
        res.status(400).send()
    }

    



})

router.post('/users/logout', auth, async (req, res) => {
    try { 
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.send()
    } catch(error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(error) {
        res.status(500).send()
    }
})
//endpoint for getting profile of user currently logged in
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})



//endpoint for updating a user by it's ID

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name' , 'email', 'password', 'age']
    const updateIsValid =  updates.every((update) => allowedUpdates.includes(update))

    if (!updateIsValid) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {

        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })

        await req.user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        
        
        res.send(req.user) 
    } catch (error) {
        res.status(400).send(error)
    }
})


// endpoint to delete user
router.delete('/users/me', auth, async (req, res) => {
    try {
       

        req.user.remove()
        sendCancelEmail(user.email, user.name)
        res.send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
})

//endpoint to upload an avatar
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req,file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image file'))

        }
        cb(undefined, true)
    }
})

//endpoint to upload a user avatar
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message})
}) 

//endpoint to delete a user avatar

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type','image/png')
        res.send(user.avatar)
    } catch(error) {
        res.status(404).send()
    }
})
module.exports = router