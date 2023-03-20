const mongoose = require('mongoose')
const {Schema} = mongoose

const ItemSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    date_added:{
        type: Date,
        default: Date.now
    }
})

const Item = mongoose.model('Item', ItemSchema)

module.exports = Item