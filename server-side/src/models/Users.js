const {mongoose} = require('../app')
//todo here-  create scheme for UserPassName, User (register user).

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username:{
        type:String,
        unique: true,
        default: null

    },
    displayName:{
        type:String,
        default: null
    },
    profilePic:{
        type:String,
        default: null
    }
})

const UserPassNameSchema = new Schema({
    username:{
        type:String,
        unique: true,
        default: null

    },
    password:{
        type:String,
        default: null
    },
    displayName:{
        type:String,
        default: null
    },
    profilePic:{
        type:String,
        default: null
    }
})



const User = mongoose.model('User', UserSchema)
const UserPassName = mongoose.model('UserPassName', UserPassNameSchema)

module.exports = {User:User, UserPassName:UserPassName}