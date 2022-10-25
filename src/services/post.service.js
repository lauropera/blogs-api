const { validateBlogPost } = require('./validations/validationsInputValues');
const { getAllCategories } = require('./categories.service');
const { BlogPost } = require('../models');
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
    return { type: null, message: dataValues };
  }

  const errorMessage = 'one or more "categoryIds" not found';
  return { type: 'INVALID_VALUES', message: errorMessage };
};

module.exports = {
  createBlogPost,
};
