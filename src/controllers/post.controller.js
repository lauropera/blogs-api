const { mapError } = require('../utils/errorMap');
const { postService } = require('../services');

const createBlogPost = async (req, res) => {
  const { displayName } = req.user;
  const postInformations = req.body;
  const { type, message } = await postService.createBlogPostRegistry(
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

const getBlogPostById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await postService.getBlogPostById(id);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(200).json(message);
};

const editBlogPost = async (req, res) => {
  const { id } = req.params;
  const { displayName } = req.user;
  const { type, message } = await postService.editBlogPost(
    displayName,
    id,
    req.body,
  );
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(200).json(message);
};

const deleteBlogPost = async (req, res) => {
  const { id } = req.params;
  const { displayName } = req.user;
  const { type, message } = await postService.deleteBlogPost(displayName, id);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(204).end();
};

const getBlogPostsByQuery = async (req, res) => {
  const { q } = req.query;
  const { type, message } = await postService.getBlogPostsByQuery(q);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  editBlogPost,
  deleteBlogPost,
  getBlogPostsByQuery,
};
