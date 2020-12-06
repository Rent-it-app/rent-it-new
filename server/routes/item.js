const express = require('express');

const router = express.Router();

//import controllers methods
const {create,list, read, update, remove} = require('../controllers/item');
const verify = require('./verifyToken');

router.post('/item',create);
router.get('/items', list);
router.get('/item/:slug',read);

router.put('/item/:slug',update);
router.delete('/item/:slug',remove);

module.exports = router;