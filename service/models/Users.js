const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String, 
            required: true,
        },
        user: {
            type: String, 
            required: true,
        },
        email: {
            type: String, 
            required: true
        },
        age: {
            type: Number,
        },
        passwd: {
            type:String,
            required: true
        },
        city: {
            type:String,
        },
    }, 
    {timestamps:true}
)

module.exports = mongoose.model("User", userSchema)