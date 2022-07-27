const mongoose = require('mongoose')

const houseSchema = new mongoose.Schema(
    {
        name:{
            type: String, 
            required: true,
        },
        desc: {
            type: String, 
            required: true,
        },
        imgs: {
            type: Array,
        },
        bairro: {
            type:String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        offer: {
            type: Number,
            default: 0
        },
        temp: {
            type: Boolean,
            default: false
        },
        userId: {
            type: String,
            required: true
        }
    }, 
    {timestamps:true}
)

module.exports = mongoose.model("House", houseSchema)