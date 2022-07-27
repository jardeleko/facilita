const router = require('express').Router()
const Houses = require('../models/Houses')
const  {verifyToken, verifyTokenAuth} = require('./verifyToken')

router.get("/find", async (req, res) => {
    await Houses.find().sort({createdAt:-1}).then((dados) => {
        res.status(200).json(dados)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

router.get("/find/:id", async (req, res) => {
    const id = req.params.id

    await Houses.findById(id).then((house) => {
        res.status(200).json(house)
    }).catch((err) => {
        res.status(200).json(err)
    })

})

router.get("/getpost/:userId", verifyTokenAuth, async (req, res) => {
    await Houses.find({userId: req.params.userId}).then((house) => {
        res.status(200).json(house)
    }).catch((err) => {
        res.status(200).json(err)
    })
})

//POST Like true
router.post("/", async (req, res) => {
    const newHouse = new Houses(req.body)
    try {
        const savedHouse = await newHouse.save();
        res.status(200).json(savedHouse)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Delete Like true
router.put("/:id", async (req, res) => {
    await Houses.findByIdAndUpdate(req.params.id, { $set: req.body }, {new:true}).then((UpdateHouse) => {
        res.status(200).json(UpdateHouse)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Delete Like true
router.delete("/:id", verifyTokenAuth, async (req, res) => {
    const id = req.params.id
    try {
        const house = await Houses.findByIdAndDelete(req.params.id)
        res.status(200).json(house)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router