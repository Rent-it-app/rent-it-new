//the authontication route for regester page (login)
const router = require('express').Router();
//import the usermodel o use the schema to insert the data 
const User = require('../models/User')
// use joi to validate the data inputs from user 
const Joi = require('@hapi/joi');
//for hashing the password
const bcrypt = require('bcrypt');

const validator = require('express-joi-validation').createValidator({})

const { schema } = require('../models/User');

/******************************************/
//the validation schema using joi :)
const querySchema = Joi.object({

    name         : Joi.string().required(),
    email        : Joi.string().required().lowercase().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password     : Joi.string().min(8).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),//to be mix of these values
    passwordAgain: Joi.ref('password'),//to equal password

  })

//we add async here cause we need sometime to submit the data here
router.post('/register',async(req, res)=> {

    const { name, email, password, passwordAgain } = req.body;//I love e6 <3 

/*****************************************/
//what I need to cheeck for the user registration:

//0- The feileds are empty O.O .. forget this shhhh
if(!email || !name || !password|| !passwordAgain)
    return res.status(400).json({msg :"Please enter all the information"})

//1- The email is not alredy at the database
const doesExist = await User.findOne({ email })
if(doesExist)
    return res.status(400).json({msg :"the email is used"})

 

//2- The inputs are correct using the validation 
const{error}         =querySchema.validate(req.body);
if(error){
    console.log(error)
    return res.status(400).json({msg :error.details[0].message})}

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
       res.json(savedUser);//to make shure everything is right
   } catch (error) {
       res.status(500).send(error);
   }

})
module.exports = router;