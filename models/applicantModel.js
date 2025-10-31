const mongoose = require('mongoose')

const applicantSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
     JobTitle:{
        type:String,
        required:true
    },
     Qualification:{
        type:String,
        required:true
    },
     email:{
        type:String,
        required:true
    },
     Phone:{
        type:Number,
        required:true
    },
     coverLetter:{
        type:String,
        required:true
    },
    resume :{
        type:String,
        required: true
    }
})


module.exports = mongoose.model('applicants',applicantSchema)