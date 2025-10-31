const mongoose = require('mongoose')

const connectionString = process.env.connectionString

mongoose.connect(connectionString).then((res)=>{
    console.log("successfully connected to mongoDB")
}).catch((err)=>{
    console.log(err)
})