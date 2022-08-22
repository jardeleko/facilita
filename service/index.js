const express = require('express')
const app = express()
const dotenv = require('dotenv')
const path = require('path')
const mongoose = require('mongoose')
const houseRouter = require('./routes/houses')
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const messageRouter = require('./routes/messages')
const converseRouter = require('./routes/converse')

const cors = require('cors')
app.use(express.json())
app.use(cors())
dotenv.config()

app.get('/', (req, res) => {
	res.sendStatus(200)
})

app.use('/api', authRouter)
app.use('/api/user', userRouter)
app.use('/api/house', houseRouter)
app.use('/api/message', messageRouter)
app.use('/api/converse', converseRouter)

mongoose.connect(process.env.MONGO_URI).then(() => 
		console.log("DB connect successfull") )
	.catch((err) => {
		console.log("Error Connection, exception:", err)
})

app.listen(process.env.PORT || '5000', () => {
	try{
		console.log("http://localhost:"+process.env.PORT)  
	}
	catch{
		console.log('http problem')
	}
})
