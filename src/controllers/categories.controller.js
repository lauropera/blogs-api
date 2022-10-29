const { categoriesService } = require('../services');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await categoriesService.createCategory(name);
  if (type) return res.status(type).json({ message });
  return res.status(201).json({ id: message, name });
};

const getAllCategories = async (_req, res) => {
  const categories = await categoriesService.getAllCategories();
  return res.status(200).json(categories);
};

module.exports = {
  createCategory,
  getAllCategories,
};
