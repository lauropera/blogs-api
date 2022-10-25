const express = require('express');
const postController = require('../controllers/post.controller');

const router = express.Router();

router.post('/', postController.createBlogPost);
router.get('/', postController.getAllBlogPosts);
router.get('/:id', postController.getBlogPostById);

module.exports = router;
