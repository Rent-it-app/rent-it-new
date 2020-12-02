const jwt = require('jsonwebtoken');

/***************************************************/
//this is the middle ware functtion that will make the varify on the routs so the user cann't use the rout if 
//he don't have theToken 
//next === callback function 
module.exports = function(req,res,next){

const token = req.header('theToken');

if(!token) return res.status(401).send("Access Denied Man ! Go and regester");

try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    next();
} catch (error) {
    return res.status(400).send("Invaled Token");
}

}