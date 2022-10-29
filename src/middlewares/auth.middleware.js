const authService = require('../services/auth.service');

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const { type, message } = authService.validateToken(authorization);
  if (type) return res.status(type).json({ message });
  req.user = message;

  next();
};

module.exports = { validateToken };
