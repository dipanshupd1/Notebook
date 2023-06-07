const mongoose = require('mongoose');
const dotenv=require('dotenv')
dotenv.config()
mongoose.set('strictQuery', true)
mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("connected to database")
}).catch((err)=>{
    console.log("connection unsuccessful",err)
})
