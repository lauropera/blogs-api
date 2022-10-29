const chai = require('chai');
const sinon = require('sinon');

chai.use(require('chai-http'));
const { expect } = chai;

const { categoriesController } = require('../../../src/controllers');
const { categoriesService } = require('../../../src/services');
const {
  newCategoryResponse,
  allCategories,
} = require('../mocks/categoriesMock');

describe('Categories controller', function () {
  afterEach(sinon.restore);

  describe('Creating a category', function () {
    it('With success', async function () {
      const req = {
        body: {
          name: 'Games',
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(categoriesService, 'createCategory')
        .resolves({ type: null, message: 1 });

      await categoriesController.createCategory(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newCategoryResponse);
    });

    it('Fails if the category is invalid', async function () {
      const req = { body: { name: '' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(categoriesService, 'createCategory')
        .resolves({ type: 400, message: '"name" is required' });

      await categoriesController.createCategory(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"name" is required',
      });
    });
  });

  describe('Searching for categories', function () {
    it('Shows all categories', async function () {
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(categoriesService, 'getAllCategories').resolves(allCategories);

      await categoriesController.getAllCategories({}, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allCategories);
    });
  });
});
