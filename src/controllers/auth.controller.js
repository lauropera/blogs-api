const { authService } = require('../services');
const { mapError } = require('../utils/errorMap');

const login = async (req, res) => {
  const { type, message } = await authService.validateLogin(req.body);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(200).json({ token: message });
};

module.exports = { login };
