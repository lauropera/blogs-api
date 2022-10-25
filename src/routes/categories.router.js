const express = require('express');
const { categoriesController } = require('../controllers');

const router = express.Router();

router.post('/', categoriesController.createCategory);
router.get('/', categoriesController.getAllCategories);

module.exports = router;
