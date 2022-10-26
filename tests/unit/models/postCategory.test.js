const chai = require('chai');

chai.use(require('sinon-chai'));
const { expect } = chai;

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const PostCategoryModel = require('../../../src/models/PostCategory');
const BlogPostModel = require('../../../src/models/BlogPost');
const CategoryModel = require('../../../src/models/Category');

describe('PostCategory model', () => {
  const PostCategory = PostCategoryModel(sequelize, dataTypes);
  const postCategory = new PostCategory();

  checkModelName(PostCategory)('PostCategory');

  context('Properties', () => {
    const properties = ['postId', 'categoryId'];
    properties.forEach(checkPropertyExists(postCategory));
  });

  context('Associations', () => {
    const BlogPost = BlogPostModel(sequelize, dataTypes);
    const Category = CategoryModel(sequelize, dataTypes);

    before(() => {
      PostCategory.associate({ BlogPost, Category });
    });

    it("defined a belongsToMany association with Category through PostCategory as 'categories'", () => {
      expect(BlogPost.belongsToMany).to.have.been.calledWith(Category, {
        as: 'categories',
        foreignKey: 'postId',
        otherKey: 'categoryId',
        through: PostCategory,
      });
    });

    it("defined a belongsToMany association with BlogPost through PostCategory as 'blogPosts'", () => {
      expect(Category.belongsToMany).to.have.been.calledWith(BlogPost, {
        as: 'blogPosts',
        foreignKey: 'categoryId',
        otherKey: 'postId',
        through: PostCategory,
      });
    });
  });
});
