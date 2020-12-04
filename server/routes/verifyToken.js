const jwt = require('jsonwebtoken');

/***************************************************/
//this is the middle ware functtion that will make the varify on the routs so the user cann't use the rout if 
//he don't have theToken 
//next === callback function 
module.exports = function(req,res,next){
try {
const token = req.header('theToken');
//if there is no token === the user don't have account
console.log(token)
if(!token){
    alert("No token , No enter")
    return res.status(401).json({msg:"No token , No enter"});

}
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);//veri fy the token using the secret token using this function 
    
    if(!verified) return res.status(401).json({msg:"Access Denied Man ! verifecation faild"});
 console.log(verified);

req.user = verified.retrevdUser;
    next();
} catch (error) {
    return res.status(400).json({msg:"Access Denied Man ! verifecation faild"});
}

}