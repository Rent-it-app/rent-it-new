const express = require('express');
/*morgan is a great logging tool that anyone who works with HTTP servers in Node. js 
should learn to use. morgan is a middleware 
that allows us to easily log requests, errors, and more to the console. */
const morgan =require('morgan');

//body-parser is a piece of express middleware that reads a form's input and stores it as a javascript object accessible through req.body
const bodyParser = require('body-parser');
//Express server might be running on a different port such as http://localhost:2020 . 
//Because of this, you'll need to allow CORS between those servers. CORS is really useful when you're offering
// a public API and would like to controll the access to certain resources and how people use them.
const cors = require('cors');
const mongoose = require('mongoose');

//The dotenv is a zero-dependency module that loads environment variables from a [.env file]
// allows us to use the .env file 
require('dotenv').config();

//require item.js from routes folder
const itemRoutes = require('./routes/item')

//app
const app = express();

//connect to database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
})
.then(()=> console.log('DB connected'))
.catch(err=> console.log(err));


//middleware
//This will allow all the routes to be accessed anywhere on the web
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

//route middleware 
app.use('/api',itemRoutes)


//port depending on the environment that is running the app OR the localhost 8000
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is running on port ${port}`));