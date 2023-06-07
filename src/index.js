const express = require('express');
const hbs = require('hbs');
const cookieParser=require("cookie-parser")
const jwt = require('jsonwebtoken');
const path = require('path');
// require('./db/conn.js')
const conn = require('./db/conn.js');
const dotenv=require('dotenv')
dotenv.config()
const User=require('./models/usermodel.js')
const auth=require('./auth.js')
const app=express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'../public')))
app.set('view engine','hbs')
conn();
const PORT=process.env.PORT ||3000
app.get('/',(req,res)=>{
    res.render('login.hbs')
})


app.get('/login/:email',auth, async(req,res)=>{
    const email=req.params.email
    // const dataget = await User.findOne({email:email})
    // console.log(dataget)
    // res.send(dataget)
    
        await User.find({email:email}).exec((err,data)=>{
            if(data){
                // console.log(data)
                res.render('note',{

                    name:data[0].name,
                    email:data[0].email,
                    
                    data3:data[0].notedata
                })
               
            }
            else{console.log("no data")}
        })
          
})



app.post("/register",async(req,res)=>{


try {
    const newuser= new User({

        name:req.body.namer,
        email:req.body.emailr,
        password:req.body.passwordr
    })
   const saveduser=await newuser.save();
   res.render("registered")
    
} catch (error) {
    console.log("error")
    res.send("error")
}

})

app.post('/login',async(req,res)=>{

   try {
    var enteredemail=req.body.emaill;
    const enteredpass=req.body.passwordl;
    const finduser=await User.findOne({email:enteredemail})
    // console.log(finduser)

    if(enteredpass==finduser.password){

      async  function jwttoken(id){
             
          const token= jwt.sign(id,"codingisfunandilikecoding")
          return token;

        }

        const tokencreated= await jwttoken({_id:finduser._id})
        console.log(tokencreated)
        res.cookie('jwt',tokencreated);
        // console.log(req.cookies.jwt)


        // res.send(finduser.name)
    //    return res.redirect(`/${req.body.emaill}`)
       return res.redirect('/login/'+req.body.emaill)
        // res.render('pro2',{name:finduser.name})
    }
    else(
        res.render('login',{loginerr:"*sorry, invalid credentials. Please try again"})
    )

   } catch (error) {
    res.render('login',{loginerr:"*sorry, invalid credentials. Please try again"})
   }
})


app.post('/data',async(req,res)=>{
   
    try {
        const email=req.body.hiddeninp;
        const text=req.body.text;
        const title= req.body.title;
        // console.log(email+" "+text+" "+title)
        // res.send(email+" "+text+" "+title)
        const upd={notedata:{title:title,text:text}}
        const updatednote=await User.findOneAndUpdate({email:email},{$push:upd},{new:true})
        return res.redirect(`/login/${req.body.hiddeninp}`)
        // res.send(updatednote)
       
        
    } catch (err) {
        res.send(err+"  error")
    }

})

app.post('/user/del',async(req,res)=>{
    const id=req.body.hiddendel;
    const email=req.body.delemail;
    const del={notedata:{_id:id}}
    const find= await User.findOneAndUpdate({email:email},{$pull:del},{new:true})
    return res.redirect(`/login/${email}`)
    
})

app.get('/logout',(req,res)=>{

    res.clearCookie("jwt")
    // res.send("error")
   res.redirect('/')
})


app.listen(PORT,()=>{
    console.log('listening at port 3000')
})