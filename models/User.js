const mongoose = require('mongoose')
const {isEmail} = require('validator')
const {Schema} = mongoose
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

const UserSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: [true,'Please enter an email'],
        unique: true,
        lowercase: true,
        validate:[isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength:[6,'Minimum password must be 6 string']
    },
    phone:{
        type: Number
    },
    register_date:{
        type: Date,
        default: Date.now
    },   
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
})

//hashing user password
UserSchema.pre('save', async function(next){
    const user = this
    
    console.log('before saving')
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

//generating AuthToken
UserSchema.methods.generateAuthToken = async function(){
    const user = this
    const maxAge = 3*24*60*60
    const token = jwt.sign({
        _id:user._id.toString()}, 
        config.get('jwtsecret'),{
            expiresIn: maxAge
        })
        user.tokens = user.tokens.concat({token})
        await user.save()
        return token
        console.log('token added')
}

//Logging in users
UserSchema.statics.loginDetails = async(email, password)=>{
    //verifying email address
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login E')
    }

    //verifying the password
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to log in P')
    }
    return user
}

const User = mongoose.model('user', UserSchema)

module.exports = User