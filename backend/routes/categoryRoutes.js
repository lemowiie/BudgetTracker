const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

const { protect } = require('../middleware/auth'); 

router.get('/', protect, categoryController.getCategories);
router.post('/', protect, categoryController.create);

module.exports = router;