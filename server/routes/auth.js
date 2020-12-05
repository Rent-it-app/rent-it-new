//the authontication route for regester page (login)
const router = require('express').Router();
//import the usermodel o use the schema to insert the data 
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




/******************************************/
//the validation schema using joi :)
const querySchema = Joi.object({

    name         : Joi.string().required(),
    email        : Joi.string().required().lowercase().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password     : Joi.string().min(8).required(),
    passwordAgain: Joi.ref('password'),//to equal password

  })

//we add async here cause we need sometime to submit the data here
router.post('/register',async(req, res)=> {

    const { name, email, password, passwordAgain } = req.body;//I love e6 <3 

/*****************************************/
//what I need to cheeck for the user registration:

//0- The feileds are empty O.O .. forget this shhhh
if(!email || !name || !password|| !passwordAgain)
    return res.status(401).json({msg :"Please enter all the information"})

//1- The email is not alredy at the database
const doesExist = await User.findOne({ email })
if(doesExist)
    return res.status(402).json({msg :"the email is used"})

 

//2- The inputs are correct using the validation 
const{error}         = querySchema.validate(req.body);
if(error){
   console.log(error)
    return res.status(403).json({msg :error.details[0].message})}

//hashhhhhhhh
const salt           = await bcrypt.genSalt();
const hashedPassword = await bcrypt.hash(password,salt);

   const user = new User({

       name         : name,
       email        : email,
       password     : hashedPassword,
   })
   
   try {
       const savedUser = await user.save();//if there is no error save the user at db
       res.json(savedUser);//go to signin
   } catch (error) {
       res.status(500).send(error);
   }

})

/**************************************************/
/*WhAT i NEED TO DO ?
1- take the value (email and password) and store them at const
2- check if the values are not empty
3-look for the email at the db using(findone method)
3- the pass is encripted sooo , I will use the tokens method and gooooogle for it
*/
router.post('/signin',async(req, res)=> {
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
})
/************************************************************** */
//retrun true or false if the token exist and it's valid
router.post('/check_token', async (req ,res) =>{
    try {
        //get the token from the header 
        const token = req.header('theToken');
       
        if(!token) return res.json('Empty');
        //check if it's valide token
        const verified     = JWT.verify(token , process.env.SECRET_TOKEN);
        
        if(!verified) return res.json(false);
        //check if the user is stored at the database retrevedUser = id :p
        const userOfToken = await User.findById(verified.retrevdUser);
        //console.log(userOfToken) contains all the user data from the db
        if(!userOfToken) return res.json(false);
       
        return res.json(true);

    } catch (error) {
        return res.status(500).json({err : error.message})
    }
})
/*
router.get("/",verifyToken, async (req,res) => {
    const user = await User.findById(req.retrevdUser);
    console.log(user)
    res.json({name :user.name , id:user._id })
})
*/
module.exports = router;