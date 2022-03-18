const express = require("express");
const router = express.Router({ mergeParams: true });

// Get list items
router.get('/', (req, res) => {

});

// Add item to list
router.post('/', (req, res) => {
 
});

// Update list item
router.patch('/:itemId', (req, res) => {

});

// Update, add, or delete multiple list items
router.patch('/', (req, res) => {
  
})

// Delete list item
router.delete('/:itemId', (req, res) => {

});

module.exports = router;