const {
  loginSchema,
  newUserSchema,
  nameSchema,
  newBlogPostSchema,
  blogPostSchema,
} = require('./schema');

const validateBody = (credentials) => {
  const { error, value } = loginSchema.validate(credentials);
  if (error) return { type: 400, message: error.message };
  return { type: null, message: value };
};

const validateNewUser = (informations) => {
  const { error, value } = newUserSchema.validate(informations);
  if (error) {
    return { type: 400, message: error.message };
  }
  return { type: null, message: value };
};

const validateNewCategory = (categoryName) => {
  const { error, value } = nameSchema.validate(categoryName);
  if (error) return { type: 400, message: error.message };
  return { type: null, message: value };
};

const validateBlogPost = (postInformations, isNewPost) => {
  const schema = isNewPost ? newBlogPostSchema : blogPostSchema;
  const { error, value } = schema.validate(postInformations);
  if (error) return { type: 400, message: error.message };
  return { type: null, message: value };
};

module.exports = {
  validateBody,
  validateNewUser,
  validateNewCategory,
  validateBlogPost,
};
