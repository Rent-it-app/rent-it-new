const User = require('../models/User')
// use joi to validate the data inputs from user 
const Joi = require('@hapi/joi');
//for hashing the password
const bcrypt = require('bcrypt');
//for the token
const JWT = require('jsonwebtoken');

const validator = require('express-joi-validation').createValidator({})
//the user model schema
const { schema } = require('../models/User');

require('dotenv').config()
const verifyToken = require('./verifyToken');





/**************************************************/
/*WhAT i NEED TO DO ?
1- take the value (email and password) and store them at const
2- check if the values are not empty
3-look for the email at the db using(findone method)
3- the pass is encripted sooo , I will use the tokens method and gooooogle for it
*/
exports.register = (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password)
        return res.status(401).json({msg :"password and email are required"})

        //3-find the user email at the db by email since it is uonic and it will return boolean so..
        const retrevdUser = await User.findOne({ email:email }) ;
        if( !retrevdUser ){
        return res.status(402).json({msg:"Sorry you don't have acount on the webpage please login... 3eeeb 3aleek"})
        
        }
        //4-You need to compare the encripted pass with the pass entered from the user by using bcrypt.compare
        //it will return boolean so 
        const comparePass = await bcrypt.compare( password, retrevdUser.password )
        if( !comparePass )
        return res.status(403).json({msg:"Invalid Credentials, 3eeeeb 3aleeek U_U "})

        //5- create the token for the user
        //-make the SECRET_TOKEN by  require('crypto').randomBytes(64).toString('hex') at the terminal but before that you 
        //should write node so you can use it 
        //sign take (what we wont to serialized)
        const token = JWT.sign({ retrevdUser : retrevdUser._id }, process.env.SECRET_TOKEN)
        res.header('theToken',token);// put the token in the header so we send it 
        res.status(200).json({ token, retrevdUser :{id:retrevdUser._id , name: retrevdUser.name} }) //send the token to the local storge
    } catch (error) {
        return res.status(500).json({err : error.message})
    }
}

