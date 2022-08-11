const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String, 
            required: true,
        },
        user: {
            type: String, 
        },
        email: {
            type: String, 
            required: true,
            unique: true
        },
        avatar: {
            type: String,
            default: 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar.png'
        },
        age: {
            type: Number,
        },
        passwd: {
            type:String,
        },
        city: {
            type:String,
        },
    }, 
    {timestamps:true}
)

module.exports = mongoose.model("User", userSchema)