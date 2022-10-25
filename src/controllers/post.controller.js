const { mapError } = require('../utils/errorMap');
const { postService } = require('../services');

const createBlogPost = async (req, res) => {
  const { displayName } = req.user;
  const postInformations = req.body;
  const { type, message } = await postService.createBlogPost(
    displayName,
    postInformations,
  );
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(201).json(message);
};

const getAllBlogPosts = async (_req, res) => {
  const blogPosts = await postService.getAllBlogPosts();
  return res.status(200).json(blogPosts);
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
};
