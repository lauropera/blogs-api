const express = require('express');
const postController = require('../controllers/post.controller');

const router = express.Router();

router.post('/', postController.createBlogPost);

module.exports = router;
