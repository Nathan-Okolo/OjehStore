const mongoose = require('mongoose')
const config = require('config')

const dbURL = config.get('dbURL')


mongoose.connect(dbURL)
.then(console.log('connected to the database'))
.catch((err)=> console.log(`this error occouredd ${err}`))