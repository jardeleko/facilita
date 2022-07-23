const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const houseRouter = require('./routes/houses')
dotenv.config()

app.use(cors())
app.use(express.json())
app.use('/api/house', houseRouter);

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