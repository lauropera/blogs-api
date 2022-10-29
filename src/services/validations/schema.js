const Joi = require('joi');

const missingMsg = 'Some required fields are missing';

const nameSchema = Joi.string().required().messages({
  'any.required': '"name" is required',
  'string.empty': '"name" is required',
});

const stringSchema = Joi.string().required().messages({
  'any.required': missingMsg,
  'string.empty': missingMsg,
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': missingMsg,
    'string.empty': missingMsg,
  }),
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
  'object.unknown': missingMsg,
});

const blogPostSchema = Joi.object({
  title: stringSchema,
  content: stringSchema,
}).messages({
  'object.unknown': missingMsg,
});

module.exports = {
  loginSchema,
  newUserSchema,
  nameSchema,
  newBlogPostSchema,
  blogPostSchema,
};
