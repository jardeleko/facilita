const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
    {
        _id:{
            type: String, 
            required: true,
        },
        text: {
            type: Array,
            required: true,
        },
        user: {
            _id:{
                type: String,
                required: true,
            },
            name: {
                type:String,
                required: true,
            },
            idPub: {
                type: String,
                required:true
            }
        },
        createdAt: {
            type: Date,
            required: true
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        }
    },
)

module.exports = mongoose.model("Message", messageSchema)