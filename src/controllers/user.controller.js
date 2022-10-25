const { userService } = require('../services');
const { mapError } = require('../utils/errorMap');

const createNewUser = async (req, res) => {
  const { type, message } = await userService.createNewUser(req.body);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(201).json({ token: message });
};

const getAllUsers = async (_req, res) => {
  const users = await userService.getAllUsers();
  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await userService.getUserById(id);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(200).json(message);
};

const deleteSelfUser = async (req, res) => {
  const { displayName } = req.user;
  await userService.deleteSelfUser(displayName);
  return res.status(204).end();
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
  deleteSelfUser,
};
