const express = require('express')
const app = express()
const http = require('http')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const houseRouter = require('./routes/houses')
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const messageRouter = require('./routes/messages')
const converseRouter = require('./routes/converse')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

dotenv.config()
app.use(cors())
app.use(express.json())
app.use('/api', authRouter)
app.use('/api/house', houseRouter)
app.use('/api/user', userRouter)
app.use('/api/message', messageRouter)
app.use('/api/converse', converseRouter)

io.on('connection', (socket) => {
    socket.on('chat message', msg => {
        io.emit('chat message', msg)
    })
    console.log('a user connected')
});


mongoose.connect(process.env.MONGO_URI).then(() => 
    console.log("DB connect successfull")
).catch((err) => {
    console.log("Error Connection, exception:", err)
})

app.listen(process.env.PORT || '5000', () => {
    try{
        console.log('listen in', process.env.PORT) 
    }
    catch{
        console.log('http problem')
    }
})