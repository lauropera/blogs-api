const { PostCategory } = require('../models');

const formattedPostCategories = (postId, categoryIds) =>
  categoryIds.map((id) => ({ postId, categoryId: id }));

const addPostCategoryRegistry = async (postId, categoryIds) => {
  const postsAndCategories = formattedPostCategories(postId, categoryIds);
  await PostCategory.bulkCreate(postsAndCategories);
};

module.exports = {
  addPostCategoryRegistry,
};
