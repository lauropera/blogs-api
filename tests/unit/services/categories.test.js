const { expect } = require('chai');
const sinon = require('sinon');

const { Category } = require('../../../src/models');
const { categoriesService } = require('../../../src/services');
const {
  allCategories,
  newCategoryResponse,
} = require('../mocks/categoriesMock');

describe('Categories service', function () {
  afterEach(sinon.restore);
  describe('Searching for categories', function () {
    it('With success', async function () {
      sinon.stub(Category, 'findAll').resolves(allCategories);

      const result = await categoriesService.getAllCategories();
      expect(result).to.deep.equal(allCategories);
    });
  });

  describe('Creating a category', function () {
    it('With success', async function () {
      sinon.stub(Category, 'create').resolves(newCategoryResponse);

      const result = await categoriesService.createCategory('Games');
      expect(result.message).to.equal(1);
    });

    it('Fails if the name is invalid', async function () {
      const result = await categoriesService.createCategory('');
      expect(result.message).to.equal('"name" is required');
    });
  });
});
