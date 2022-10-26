const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const BlogPostModel = require('../../../src/models/BlogPost');
const UserModel = require('../../../src/models/User');

describe('BlogPost model', () => {
  const BlogPost = BlogPostModel(sequelize, dataTypes);
  const blogPost = new BlogPost();

  checkModelName(BlogPost)('BlogPost');

  context('Properties', () => {
    const properties = [
      'id',
      'title',
      'content',
      'userId',
      'published',
      'updated',
    ];
    properties.forEach(checkPropertyExists(blogPost));
  });

  context('Associations', () => {
    const User = UserModel(sequelize, dataTypes);

    before(() => {
      BlogPost.associate({ User });
    });

    it('defined a belongsTo association with User as "user"', () => {
      expect(BlogPost.belongsTo).to.have.been.calledWith(User, {
        as: 'user',
        foreignKey: 'userId',
      });
    });
  });
});
