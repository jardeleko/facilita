const router = require('express').Router()
const Users = require('../models/Users')
const CryptoJS = require('crypto-js')
const {verifyToken, verifyTokenAuth} = require('./verifyToken')
//find all order by created

router.get("/find", async (req, res) => {
    await Users.find().sort({createdAt:-1}).then((users) => {
        res.status(200).json(users)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

router.post("/find/email", async (req, res) => {
    await Users.findOne({email:req.body.email}).then((user) => {
        res.status(200).json(user._id)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//find one
router.get("/find/:id", async (req, res) => {
    const id = req.params.id
    await Users.findById(id).then((user) => {
        res.status(200).json(user)
    }).catch((err) => {
        res.status(200).json(err)
    })
})

router.get("/findname/:id", async (req, res) => {
    const id = req.params.id
    await Users.findById(id).then((user) => {
        res.status(200).json(user.name)
    }).catch((err) => {
        res.status(200).json(err)
    })
})
//Delete Like true
router.put("/:id", async (req, res) => {
    if(req.body.passwd){
        req.body.passwd = CryptoJS.AES.encrypt(req.body.passwd, process.env.PASS_SECRET).toString()
    }
    await Users.findByIdAndUpdate(req.params.id, { $set: req.body }, {new:true}).then((updateUser) => {
        res.status(200).json(updateUser)
    }).catch((err) => {
        console.log('chegou')
        res.status(500).json(err)
    })
})

//Delete one user
router.delete("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const user = await Users.findByIdAndDelete(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router