const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    male : {
        type : String,
        required : false
    },
    female : {
        type : String,
        required : false
    }
}, {timestamps : true})

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel