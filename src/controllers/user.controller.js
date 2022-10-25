const { userService } = require('../services');
const { mapError } = require('../utils/errorMap');

const createNewUser = async (req, res) => {
  const { type, message } = await userService.createNewUser(req.body);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(201).json({ token: message });
};

module.exports = {
  createNewUser,
};
