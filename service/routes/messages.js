const router = require('express').Router()
const Message = require('../models/Messages')
const {verifyToken, verifyTokenAuth} = require('./verifyToken')
//find all order by created

router.post("/", async (req, res) => {
    const newMessage = new Message(req.body)
    console.log(newMessage)
    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(error)
    }
})

//find by message
router.get("/find/:id", async (req, res) => {
    await Message.findById(req.params.id).then((mess) => {
        res.status(200).json(mess)
    }).catch((err) => {
        res.status(200).json(err)
    })
})

//find by user
router.get("/find/:idUser", async (req, res) => {
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