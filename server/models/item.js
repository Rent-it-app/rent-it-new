const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema

const itemSchema = new mongoose.Schema({
    
    itemName: {
        type: String,
        trim: true,
        min: 3,
        max: 160,
        required: true
    },
    slug:{
        type: String,
        unique:true,
        index: true,
        lowercase: true
    },
    itemDescription:{
        type: {},
        required: true,
        min: 20,
        max: 2000000
    },

    itemPrice:{
        type: Number,
        required: true,
    },
    user:{
        type: String,
        default: 'User'
    }

}, {timestamps: true});

module.exports =mongoose.model('Item', itemSchema);