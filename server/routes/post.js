const express = require('express');
const router = express.Router();

//import controllers meethod
const {create} = require('../controllers/post');

// post route
router.post('/post',create);

module.exports = router;