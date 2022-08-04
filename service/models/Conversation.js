const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema(
    {
        messages: 
        [{
            _id: { //message
                type: String,
                required: true
            },
            text: {
                type: Array,
                required: true
            },
            createdAt: {
                type: Date,
                required: true
            },
            updatedAt: {
                type: Date,
                default: Date.now()
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
        }]
    }
)

module.exports = mongoose.model("Conversation", conversationSchema)