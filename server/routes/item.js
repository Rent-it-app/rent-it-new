const express = require('express');

const router = express.Router();

//import controllers methods
const {create,list, read, update, remove} = require('../controllers/item');

// post route to create new item
router.post('/item',create);
// get all items from database and render on homepage
router.get('/items', list);
// get specific item and display this item page
router.get('/item/:slug',read);
// update an item and reflect updates on database
router.put('/item/:slug',update);
// delete item from database
router.delete('/item/:slug',remove);

module.exports = router;