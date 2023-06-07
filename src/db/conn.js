const mongoose = require('mongoose');
const dotenv=require('dotenv')
dotenv.config()

// .then(()=>{
//     console.log("connected to database")
// }).catch((err)=>{
//     console.log("connection unsuccessful",err)
// })
 function conn(){

    mongoose.set('strictQuery', true)
     mongoose.connect(process.env.DB_URL)
}

module.exports=conn
