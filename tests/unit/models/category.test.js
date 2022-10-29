const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const CategoryModel = require('../../../src/models/Category');

describe('Category model', () => {
  const Category = CategoryModel(sequelize, dataTypes);
  const category = new Category();

  checkModelName(Category)('Category');

  context('Properties', () => {
    const properties = ['id', 'name'];
    properties.forEach(checkPropertyExists(category));
  });
});
