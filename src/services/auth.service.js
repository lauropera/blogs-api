const jwtUtil = require('../utils/jwt.util');
const { User } = require('../models');
const { validateBody } = require('./validations/validationsInputValues');

const createToken = (userData) => {
  const { password: _, ...userWithoutPassword } = userData;
  const token = jwtUtil.createToken(userWithoutPassword);
  return token;
};

const validateLogin = async (credentials) => {
  const error = validateBody(credentials);
  if (error.type) return error;

  const { email, password } = credentials;

  const user = await User.findOne({ where: { email, password } });
  if (!user) return { type: 400, message: 'Invalid fields' };

  const token = createToken(user.dataValues);
  return { type: null, message: token };
};

const validateToken = async (token) => {
  if (!token) return { type: 401, message: 'Token not found' };
  const result = await jwtUtil.validateToken(token);
  return result;
};

module.exports = { validateLogin, validateToken, createToken };
