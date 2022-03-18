const express = require("express");
const router = express.Router();
const items = require('./items');

// Create new list
router.post('/', (req, res) => {

});

// Get list info
router.get('/:listId', (req, res) => {

});

// Update list info
router.patch('/:listId', (req, res) => {

});

// Delete list
router.delete('/:listId', (req, res) => {

});

// List items
router.use('/:listId/items', items);


module.exports = router;