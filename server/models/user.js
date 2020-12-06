const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    password:{
        type: String,
        required: true,
        min: 8,
    },
    email:{
        type: String,
        trim: true,
        required: true
    },
   

}, {timestamps: true});

module.exports =mongoose.model('User', userSchema);