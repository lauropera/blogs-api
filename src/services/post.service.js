const { Op } = require('sequelize');
const { validateBlogPost } = require('./validations/validationsInputValues');
const { getAllCategories } = require('./categories.service');
const { addPostCategoryRegistry } = require('./post_categories.service');
const { BlogPost, User, Category } = require('../models');
const { getUserIdByName } = require('./user.service');

const validateCategories = async (categoryIds) => {
  const allCategories = await getAllCategories();
  const allCategoriesIds = allCategories.map(({ id }) => id);
  return categoryIds.every((id) => allCategoriesIds.includes(id));
};

const isUserAllowed = async (userId, postId) => {
  const blogPost = await BlogPost.findByPk(postId);
  if (blogPost && blogPost.dataValues.userId === userId) {
    return { type: null, message: '' };
  }
  return { type: 401, message: 'Unauthorized user' };
};

const createBlogPost = async (userDisplayName, post) => {
  const userId = await getUserIdByName(userDisplayName);
  const { dataValues } = await BlogPost.create({ userId, ...post });
  await addPostCategoryRegistry(dataValues.id, post.categoryIds);
  return dataValues;
};

const createBlogPostRegistry = async (userDisplayName, post) => {
  const isNewPost = true;
  const error = validateBlogPost(post, isNewPost);
  if (error.type) return error;

  const { categoryIds } = post;
  const doesCategoriesExists = await validateCategories(categoryIds);
  if (doesCategoriesExists) {
    const blogPost = await createBlogPost(userDisplayName, post);
    return { type: null, message: blogPost };
  }

  const errorMessage = 'one or more "categoryIds" not found';
  return { type: 400, message: errorMessage };
};

const getAllBlogPosts = async () => {
  const blogPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return blogPosts;
};

const getBlogPostById = async (id) => {
  const blogPost = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (blogPost) return { type: null, message: blogPost };
  return { type: 404, message: 'Post does not exist' };
};

const editBlogPost = async (userName, postId, postInformations) => {
  const error = validateBlogPost(postInformations);
  if (error.type) return error;

  const userId = await getUserIdByName(userName);
  const allowedUser = await isUserAllowed(userId, postId);

  if (!allowedUser.type) {
    const { title, content } = postInformations;
    await BlogPost.update({ title, content }, { where: { userId } });
    const { message } = await getBlogPostById(postId);
    return { type: null, message };
  }

  return allowedUser;
};

const deleteBlogPost = async (userName, id) => {
  const validPost = await getBlogPostById(id);
  if (validPost.type) {
    return { type: 404, message: 'Post does not exist' };
  }

  const userId = await getUserIdByName(userName);
  const allowedUser = await isUserAllowed(userId, id);
  if (allowedUser.type) return allowedUser;

  await BlogPost.destroy({ where: { id } });
  return { type: null, message: '' };
};

const getBlogPostsByQuery = async (query) => {
  const blogPosts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { type: null, message: blogPosts };
};

module.exports = {
  createBlogPostRegistry,
  getAllBlogPosts,
  getBlogPostById,
  editBlogPost,
  deleteBlogPost,
  getBlogPostsByQuery,
};
