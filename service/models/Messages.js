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
            _id:{ //receive
                type: String,
                required: true,
                immutable: true,
            },
            idRec:{ //publisher
                type: String,
                required: true,
                immutable: true,
            },
            name: { //name publisher
                type: String,
                required: true
            },
            avatar: {
                type: String,
            },
            idHouse: {
                type:String,
                required: true
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