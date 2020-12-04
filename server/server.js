const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

//import the routes of the app ....
const itemRoutes = require('./routes/item')

const authRoutes = require('./routes/auth')
const testRoutes = require('./routes/test')
//app
const app = express();

//connect to database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true ,
    
})
.then(()=> console.log('DB connected'))
.catch(err=> console.log(err));


//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

//route middleware 

app.use('/api',itemRoutes)
app.use('/api',authRoutes);
app.use('/api/test',testRoutes);

//port with what ever the port will be given by heruko
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is running on port ${port}`));