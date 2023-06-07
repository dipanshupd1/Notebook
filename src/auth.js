const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

async function auth(req,res,next){
try {
    // console.log('logged cookie');
   const getcookie=req.cookies.jwt; 
  const verify= await jwt.verify(getcookie,"codingisfunandilikecoding")
  console.log(verify);
next();
    
} catch (error) {
    // res.send("errpr")
    res.redirect("/")
    
}


}






module.exports = auth