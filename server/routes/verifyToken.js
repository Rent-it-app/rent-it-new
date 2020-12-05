const jwt = require('jsonwebtoken');

/***************************************************/
//this is the middle ware functtion that will make the varify on the routs so the user cann't use the rout if 
//he don't have theToken 
//next === callback function 
module.exports = function(req,res,next){
try {
const token = localStorage.getItem(req.body.theToken)
console.log(token)
//if there is no token === the user don't have account

if(!token)
    return res.status(401).json({msg:"Please sign in"});


    const verified = jwt.verify(token, process.env.SECRET_TOKEN);//veri fy the token using the secret token using this function 
    console.log(verified);
    if(!verified) return res.status(401).json({msg:"Access Denied Man ! verifecation faild"});


req.user = verified.retrevdUser;
    next();
} catch (error) { console.log(error.response);
    return res.status(400).json({msg:" verifecation faild"});
}

}