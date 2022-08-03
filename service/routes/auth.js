const router = require('express').Router()
const User = require('../models/Users')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

// OK
router.post("/register", async (req, res) => {
    console.log(req.body)
    const newUser = new User({
        name: req.body.name,
        user: req.body.user,
        email: req.body.email,
        age: req.body.age,
        city: req.body.city,
        passwd: CryptoJS.AES.encrypt(req.body.passwd, process.env.PASS_SECRET).toString(),
    })
    await newUser.save().then((savedUser) => {
        res.status(201).json(savedUser)
    }).catch((err) => {
        res.status(500).json(err)
        console.log("Problem on saved" + err)
    })
})

router.post("/login", async (req, res) => {
    console.log(req.body)
    await User.findOne({user: req.body.user}).then((user) => {
        const hashPassw = CryptoJS.AES.decrypt(user.passwd, process.env.PASS_SECRET)
        console.log(hashPassw)
        
        const passw = hashPassw.toString(CryptoJS.enc.Utf8)
        const confirm = req.body.passwd
        if(passw == confirm){
            const accessTk = jwt.sign({
                id: user._id, 
            }, 
            process.env.JWT_SECRET,
            {expiresIn:'365d'}
            )
            const {password, ...others} = user._doc
            res.status(200).json({...others, accessTk})
        }
        else{       
            console.log("Wrong credentials! No user in DB or passwd invalid") //verifica se existe usuário
        }
    }).catch((err) => {
        res.status(500).json(err)
    })
})
module.exports = router