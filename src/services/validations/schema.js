const Joi = require('joi');

const nameSchema = Joi.string().required().messages({
  'any.required': '"name" is required',
  'string.empty': '"name" is required',
});

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

const newBlogPostSchema = Joi.object({
  title: stringSchema,
  content: stringSchema,
  categoryIds: Joi.array().min(1).required(),
}).messages({
  'object.unknown': 'Some required fields are missing',
});

const blogPostSchema = Joi.object({
  title: stringSchema,
  content: stringSchema,
}).messages({
  'object.unknown': 'Some required fields are missing',
});

module.exports = {
  loginSchema,
  newUserSchema,
  nameSchema,
  newBlogPostSchema,
  blogPostSchema,
};
