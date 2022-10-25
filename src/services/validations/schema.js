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

const newUserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

module.exports = {
  loginSchema,
  newUserSchema,
};
