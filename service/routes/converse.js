const router = require('express').Router()
const Converse = require('../models/Conversation')
const {verifyToken, verifyTokenAuth} = require('./verifyToken')

//list converses by user
router.get("/findbyus/:id", async (req, res) => { //user if receive message
    await Converse.find().then((converse) => {
        
        let aux = []
        let finaly = []
        
        const filters = converse.map((item) => item.messages)
        
        for(let i = 0; i < filters.length; i++){  
            console.log(filters[i][0].user._id)
            if(filters[i][0].user.idRec === req.params.id || filters[i][0].user._id === req.params.id) {
                aux.push(i) 
            }
        }        
        for(let i = 0; i < aux.length; i++){
            finaly.push(converse[aux[i]])
        }
        res.status(200).json(finaly)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//find one converse 
router.get("/find/:id", async (req, res) => {
    const id = req.params.id
    await Converse.findById(id).then((converse) => { //aggragate last year 
        res.status(200).json(converse)
    }).catch((err) => {
        res.status(200).json(err)
    })
})

//create new converse
router.post('/', async (req, res) => {
    console.log(req.body)
    const newConverse = new Converse(req.body)
    try {
        const savedConverse = await newConverse.save()
        res.status(200).json(savedConverse)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Put converse usarei muito esta query
router.put("/:id", async (req, res) => {
    await Converse.findByIdAndUpdate(req.params.id, { $set: req.body }, {new:true}).then((putConverse) => {
        res.status(200).json(putConverse)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//Delete converse (nao vou usar o delete converse)
router.delete("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const converse = await Converse.findByIdAndDelete(req.params.id)
        res.status(200).json(converse)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router