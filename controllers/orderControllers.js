const Order = require('../models/Order')
const Cart = require('../models/Cart')
const User = require('../models/User')
const config = require('config')
const stripe = require('stripe') (config.get('StripeAPIKey'))

module.exports.get_orders = async (req,res)=>{
    const userId = req.params.userId
    try{
        const orders = Order.find({userId}).sort({date: -1})
        res.status(200).send(`Order: ${orders}`)
    }catch(e){
        res.status(500).res(`error ${e}`)
    }
}

module.exports.checkout = async(req,res)=>{
    try{
        const userId = req.params.userId
        const {source} = req.body
        let cart = await Cart.findOne({userId})
        let user = await User.findOne({_id: userId})
        const email = user.email
        if(cart){
            const charge = await stripe.charges.create({
                amount: cart.bill,
                currency: 'inr',
                source: source,
                receipt_email: email
            })
            if(!charge) throw Error('Payment failed')
            if(charge) {
                const order = await Order.create({
                    userId,
                    items: cart.items,
                    bill: cart.bill
                })
                const data = await Cart.findByIdAndDelete({_id: cart.id})
                return res.status(201).send(order)
            }
        }
        else{
            res.status(500).send(`You do not have items in cart`)
        }
    }catch(e){
        console.log(e)
        res.status(500).send(`error: ${e}`)
    }
}