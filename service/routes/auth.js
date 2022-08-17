const router = require('express').Router()
const User = require('../models/Users')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { json } = require('express')

const transport = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "jardelduarte594@gmail.com",
    pass: "HIa4J1T0vsynwbAY"
  }
})

router.post('/forgot', async (req, res) => {
  User.findOne({email:req.body.email}).then((user) => {
    if(!user){
      res.status(422).json('user not exists!')
    }
    const expired = Date.now() + (3600000/2)
    const aux = Math.floor(Math.random() * 65536)
    if(aux.length < 1234) aux = Math.floor(Math.random() * 65536)
    user.passwdToken = String(aux)
    user.expireToken = expired
    user.save().then((result) =>{
      console.log(result)
      transport.sendMail({
        to:user.email,
        from: "no-replay@facilitaimoveis.com.br",
        subject: "Redifinição de Senha, Facilita Imóveis",
        html: "<p><h3>Olá, "+user.name+".<h3></p> <br><br> <p>Vimos que você solicitou a recuperação de senha.</p> <p>Para continuar, insira o código <strong>" + aux + "</strong>  na página de verificação iniciada no seu aplicativo..</p>",
      })
      res.status(200).json({token:aux, expired})
    }).then((err) =>{
      res.status(500).json(err)
    })
  }).catch((err) => {
    res.status(500).json(err)
  })
})

router.post("/register", async (req, res) => {
  let newUser
  if(req.body.accessTk){
    newUser = new User({
      name: req.body.name,
      email: req.body.email,
      avatar: req.body.avatar,
    })
  } else {
    newUser = new User({
      name: req.body.name,
      user: req.body.user,
      email: req.body.email,
      age: req.body.age,
      city: req.body.city,
      passwd: CryptoJS.AES.encrypt(req.body.passwd, process.env.PASS_SECRET).toString(),
    })
  }
  await newUser.save().then((savedUser) => {
    res.status(201).json(savedUser)
  }).catch((err) => {
    res.status(500).json(err)
    console.log("Problem on saved " + err)
    return
  })
})

router.post("/login", async (req, res) => {
  if(req.body.accessTk){
    const user = await User.findOne({email: req.body.email})
    if(user === null){ 
      res.status(500).json('null')
    }
    else{
      const newAccessTk = jwt.sign({id: user._id}, 
        process.env.JWT_SECRET,
        {expiresIn:'365d'}
      )
      const {...others} = user._doc
      console.log(others)
      res.status(200).json({...others, accessTk: newAccessTk})
    }
  } else {
    await User.findOne({$or: [
      {user: req.body.user},
      {email: req.body.user}
    ]}).then((user) => {
      const hashPassw = CryptoJS.AES.decrypt(user.passwd, process.env.PASS_SECRET)
      const passw = hashPassw.toString(CryptoJS.enc.Utf8)
      const confirm = req.body.passwd
      if(passw == confirm){
        const accessTk = jwt.sign({id: user._id}, 
          process.env.JWT_SECRET,
          {expiresIn:'365d'}
        )
        const {password, ...others} = user._doc
        res.status(200).json({...others, accessTk})
      }
      else{       
        res.status(500).json('esse foi o erro')
        console.log("Wrong credentials! No user in DB or passwd invalid") //verifica se existe usuário
      }
  }).catch((err) => {
    res.status(500).json(err)
  })
  }
})
module.exports = router