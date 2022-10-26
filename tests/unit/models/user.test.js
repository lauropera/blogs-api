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

const UserModel = require('../../../src/models/User');

describe('User model', () => {
  const User = UserModel(sequelize, dataTypes);
  const user = new User();

  checkModelName(User)('User');

  context('Properties', () => {
    const properties = ['id', 'displayName', 'email', 'password', 'image'];
    properties.forEach(checkPropertyExists(user));
  });

  context('Associations', () => {
    const BlogPost = 'a blog post';

    before(() => {
      User.associate({ BlogPost });
    });

    it('defined a hasMany association with BlogPost as "blogPosts"', () => {
      expect(User.hasMany).to.have.been.calledWith(BlogPost, {
        as: 'blogPosts',
        foreignKey: 'userId',
      });
    });
  });
});
