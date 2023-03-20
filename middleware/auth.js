const config = require('config')
const jwt = require('jsonwebtoken')

const auth = async(req, res, next)=>{
    const token  = req.header('x-auth-token')

    if(!token){
        return res.status(401).send(`No token, authorization denied`)
    }

    try{
        const decoded = jwt.verify(token, config.get('jwtsecret'))
        req.user = decoded
        console.log('authentication completed')
        next()
    }catch(e){
        res.status(401).send(`error: ${e}`)
        // console.log(e)
    }
}

module.exports = auth