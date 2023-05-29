//const mongoose = require('../app')
const mongoose = require('mongoose').default;

//const Schema = mongoose.Schema

/*
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

 */

const UserPassNameSchema = new mongoose.Schema({
    username:{
        type:String,
        unique: true,
        default: null,
        required:true

    },
    password:{
        type:String,
        default: null,
        required:true,
        validate: {
            validator: function (password) {
                // Check if the password length is greater than 7
                if (password.length <= 7) {
                    return false;
                }

                // Check if the password contains at least 4 digits
                if ((password.match(/\d/g) || []).length < 4) {
                    return false;
                }

                // Check if the password contains at least 1 uppercase letter
                if (!/[A-Z]/.test(password)) {
                    return false;
                }

                return true;
            },
            message: 'Password must be at least 8 characters long, contain at least 4 digits, and have at least 1 uppercase letter.'
        }
    },
    displayName:{
        type:String,
        default: null,
        required:true
    },
    profilePic:{
        type:String,
        default: null,
        required:true
    }
})


//const User = mongoose.model('User', UserSchema)
const UserPassName = mongoose.model('UserPassName', UserPassNameSchema)



//module.exports = {User, UserPassName}
module.exports = {UserPassName}