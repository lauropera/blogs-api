require('dotenv/config');
const jwt = require('jsonwebtoken');

const createToken = (data) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

const validateToken = async (token) => {
  try {
    const verify = await jwt.verify(token, process.env.JWT_SECRET);
    return { type: null, message: verify.data };
  } catch (error) {
    console.error(error);
    return { type: 'INVALID_TOKEN', message: 'Expired or invalid token' };
  }
};

module.exports = { createToken, validateToken };
