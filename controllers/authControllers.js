const User = require('../models/User')
const cookieParser = require('cookie-parser')

module.exports.signup = async(req,res)=>{
    const user = await new User(req.body)

    try{
        const token = await user.generateAuthToken()
        await user.save()
        res.send(`user with name: ${user.name}, 
            email: ${user.email} 
            authToken: ${token} 
            Id: ${user._id}`
        )
        
        console.log('user created')
    }catch(e){
        res.status(500).send(`this error: ${e} occoured`)
        console.log('error occoured while creating a new user')
    }
}

module.exports.login = async(req,res)=>{
    try{
        const user = await User.loginDetails(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send(` user with the following details 
        name: ${user.name}, 
        email: ${user.email},
        userId: ${user._id} 
        has been logged in with 
        token: ${token}`)
        console.log(`logged in`)

    }catch(e){
        res.status(500).send(`this Error:${e} was encounterd`)
        // console.log(e)
    }
}


// module.exports.get_user = (req,res) => {
//     User.findById(req.user.id)
//         .select('-password')
//         .then(user => res.json(user));
// }

module.exports.get_user = async(req,res)=>{
    const _id = req.body.id
    try{
        const user = await User.findById(_id)
            if(!user) {
                return res.status(404).send(`User not found`)
            }
            console.log("vsd")
        res.send(`
            ${user.name}
            ${user.email}
        `)

    }catch (e){
        res.send(e)

    }
    
}

module.exports.get_all_user = async(req,res)=>{
    try {
        const user = await User.find()
        if(user.length < 1){
           return res.send("no user found")
        }
        console.log(user)
        res.send(user)
      } catch (e) {
        res.status(500).send(`${e}`);
      }
}