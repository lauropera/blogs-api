const express = require('express');
const postController = require('../controllers/post.controller');

const router = express.Router();

router.post('/', postController.createBlogPost);
router.get('/', postController.getAllBlogPosts);
router.get('/search', postController.getBlogPostsByQuery);
router.get('/:id', postController.getBlogPostById);
router.put('/:id', postController.editBlogPost);
router.delete('/:id', postController.deleteBlogPost);

module.exports = router;
