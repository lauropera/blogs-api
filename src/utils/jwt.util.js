require('dotenv/config');
const jwt = require('jsonwebtoken');

const createToken = (data) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

const validateToken = (token) => {
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verify);
    return { type: null, message: verify.data };
  } catch (error) {
    console.error(error);
    return { type: 'INVALID_TOKEN', message: 'Expired or invalid token' };
  }
};

module.exports = { createToken, validateToken };
