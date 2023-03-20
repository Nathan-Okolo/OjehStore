const mongoose = require('mongoose')
const {Schema} = mongoose

const OrderSchema = new Schema({
    userId:{
        type: String
    },
    items:{
        productId:{
            type: String
        },
        name: String,
        quantity:{
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less than 1'],
            default: 1
        }
    },
    bill:{
        type: Number,
        required: true,
        default: 0
    },
    date_added:{
        type: Date,
        defualt: Date.now
    }
})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order