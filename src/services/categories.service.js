const { validateNewCategory } = require('./validations/validationsInputValues');
const { Category } = require('../models');

const createCategory = async (name) => {
  const error = validateNewCategory(name);
  if (error.type) return { type: error.type, message: error.message };

  const { id } = await Category.create({ name });
  return { type: null, message: id };
};

module.exports = {
  createCategory,
};
