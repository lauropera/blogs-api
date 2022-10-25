const { categoriesService } = require('../services');
const { mapError } = require('../utils/errorMap');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await categoriesService.createCategory(name);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(201).json({ id: message, name });
};

module.exports = {
  createCategory,
};
