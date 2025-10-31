const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:"Bookstore User"
    }
})

module.exports = mongoose.model('users',userSchema)