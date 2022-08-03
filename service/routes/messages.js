const router = require('express').Router()
const Message = require('../models/Messages')
const {verifyToken, verifyTokenAuth} = require('./verifyToken')
//find all order by created

router.post("/", async (req, res) => {
    const newMessage = new Message(req.body)
    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(error)
    }
})

//find 
router.get("/find/:id", async (req, res) => {
    await Message.find().then((mess) => {
        const messages = mess.map((message) => {
            if(message.user._id == req.params.id){
                return message
            }
        })
        res.status(200).json(messages)
    }).catch((err) => {
        res.status(200).json(err)
    })
})

module.exports = router