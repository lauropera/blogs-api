const { loginSchema, newUserSchema, nameSchema } = require('./schema');

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

const validateNewUser = (informations) => {
  const { error, value } = newUserSchema.validate(informations);
  if (error) {
    return {
      type: 'INVALID_VALUES',
      message: error.message,
    };
  }
  return { type: null, message: value };
};

const validateNewCategory = (categoryName) => {
  const { error, value } = nameSchema.validate(categoryName);
  if (error) return { type: 'INVALID_VALUES', message: error.message };
  return { type: null, message: value };
};

module.exports = {
  validateBody,
  validateNewUser,
  validateNewCategory,
};
