const authService = require('../services/auth.service');

const validateToken = async (req, res, next) => {
  let { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer ')) {
    authorization = authorization.substring(7, authorization.length);

    const { type, message } = await authService.validateToken(authorization);
    if (type) return res.status(type).json({ message });
    req.user = message;

    return next();
  }
  return res.status(401).json({ message: 'Token not found' });
};

module.exports = { validateToken };
