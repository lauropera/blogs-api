const { validateNewUser } = require('./validations/validationsInputValues');
const { User } = require('../models');
const { createToken } = require('./auth.service');

const doesEmailAlreadyExists = async (email) => {
  const result = await User.findOne({ where: { email } });
  return result;
};

const createNewUser = async ({ displayName, email, password, image }) => {
  const informations = { displayName, email, password, image };

  const error = validateNewUser(informations);
  if (error.type) return { type: error.type, message: error.message };

  const emailValidation = await doesEmailAlreadyExists(email);
  if (emailValidation) {
    return { type: 'ALREADY_EXISTS', message: 'User already registered' };
  }

  await User.create(informations);
  const token = createToken(informations);
  return { type: null, message: token };
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  return users;
};

module.exports = {
  createNewUser,
  getAllUsers,
};
