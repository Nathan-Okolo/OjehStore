const express = require('express')
require('./db/mongoose')
const dotenv = require("dotenv")
// const path = require('path')
authRoute = require('./routes/auth')
itemRoute = require('./routes/item')
cartRoute = require('./routes/cart')
orderRoute = require('./routes/order')

const app = express()
app.use(express.json())
app.use(authRoute)
app.use(itemRoute)
app.use(cartRoute)
app.use(orderRoute)

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('client/build'))
//     app.get('*', (req, res)=>{
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
// }
const port = process.env.PORT || 1000

app.listen(port,()=>{
    console.log(`Server up and running on port ${port}`)
})