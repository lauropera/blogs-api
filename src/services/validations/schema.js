const Joi = require('joi');

const stringSchema = Joi.string().required().messages({
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
});

const loginSchema = Joi.object({
  email: stringSchema,
  password: stringSchema,
}).messages({
  'object.unknown': 'Invalid fields',
});

module.exports = {
  loginSchema,
};
