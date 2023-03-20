const Cart = require('../models/Cart')
const Item = require('../models/Item')

module.exports.get_cart_items = async(req,res)=>{
    const userId = req.params.userId
    try{
        const cart = await Cart.findOne({userId})
    console.log(cart.items)

        if(cart && cart.items.length >0 ){
            res.send(cart)
        }
        else{
            res.send(`${null} empty cart!!!`)
        }
    }catch(e){
        res.status(500).send(`${e}`)
    }
}
// their is an error here sth about error: TypeError: cart.items.findIndex is not a function ln 34
module.exports.add_cart_items = async (req,res)=>{
    const userId = req.params.userId
    console.log(userId)    
    const{ productId, quantity } = req.body

    try{
        let cart = await Cart.findOne({userId})
        let item = await Item.findOne({_id: productId})
        if(!item){
            res.status(404).send('item not found')
        }
        const price = item.price
        const name = item.title
        // console.log(name)
        if(cart){
            // if cart exists for the user
            let itemIndex = cart.items.findIndex( p => p.productId == productId)
            
            //check if the product exists or not
            if(itemIndex > -1){
                let productItem = cart.items[itemIndex]
                productItem.quantity += quantity
                cart.items[itemIndex] = productItem
            }
            else{
                cart.items.push({productId, name, quantity, price})
            }
            cart.bill += quantity*price
            cart = await cart.save()
            console.log(`cart updated`)
            return res.status(201).send(cart)
        }
        else{
            //no cart exixting create one
            const newCart = await Cart.create({
                userId,
                items: {productId, name, quantity, price },
                bill: quantity*price
            })   
            console.log(`new cart created`) 
            console.log(newCart.items)
            return res.status(201).send(newCart)
        }
    }catch(e){
        res.status(500).send(`error: ${e}`)
        console.log(e)
    }
}

module.exports.delete_item = async(req,res)=>{
    const userId = req.params.userId
    const productId = req.params.itemId
    try{
        let cart = await Cart.findOne({ userId })
        let itemIndex = cart.items.findIndex(p=>p.productId == productId)

        if(itemIndex >-1){
            let productItem = cart.items[itemIndex]
            cart.bill -= productItem.quantity*productItem.price
            cart.items.splice(itemIndex,1)
        }
        cart = await cart.save()
        return res.status(201).send(cart)
    }catch(e){
        res.status(500).send(`error: ${e}`)
    }
}