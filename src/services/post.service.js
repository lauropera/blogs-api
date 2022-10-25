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

const createBlogPost = async (userDisplayName, postInformations) => {
  const isNewPost = true;
  const error = validateBlogPost(postInformations, isNewPost);
  if (error.type) return { type: error.type, message: error.message };

  const { title, content, categoryIds } = postInformations;
  const doesCategoriesExists = await validateCategories(categoryIds);

  if (doesCategoriesExists) {
    const userId = await getUserIdByName(userDisplayName);
    const { dataValues } = await BlogPost.create({
      title,
      content,
      userId,
    });
    await addPostCategoryRegistry(dataValues.id, categoryIds);
    return { type: null, message: dataValues };
  }

  const errorMessage = 'one or more "categoryIds" not found';
  return { type: 'INVALID_VALUES', message: errorMessage };
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
  return { type: 'NOT_FOUND', message: 'Post does not exist' };
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
};
