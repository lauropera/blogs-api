const { loginSchema } = require('./schema');

const validateBody = (credentials) => {
  const { error, value } = loginSchema.validate(credentials);
  if (error) {
    return {
      type: error.message.includes('required')
        ? 'MISSING_FIELDS'
        : 'INVALID_FIELDS',
      message: error.message,
    };
  }
  return { type: null, message: value };
};

module.exports = {
  validateBody,
};
