const chai = require('chai');
const sinon = require('sinon');

chai.use(require('chai-http'));
const { expect } = chai;

const { userController } = require('../../../src/controllers');
const { userService } = require('../../../src/services');
const { newUser, allUsers } = require('../mocks/userMocks');

describe('User controller', function () {
  afterEach(sinon.restore);

  describe('Creating a new user', function () {
    it('With success', async function () {
      const req = { body: newUser };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(userService, 'createNewUser')
        .resolves({ type: null, message: 'token' });

      await userController.createNewUser(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ token: 'token' });
    });

    it('Fails if the email already exists', async function () {
      const req = { body: newUser };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(userService, 'createNewUser').resolves({
        type: 409,
        message: 'User already registered',
      });

      await userController.createNewUser(req, res);

      expect(res.status).to.have.been.calledWith(409);
      expect(res.json).to.have.been.calledWith({
        message: 'User already registered',
      });
    });

    it('Fails if some value is invalid', async function () {
      const req = { body: { ...newUser, email: 'invalidEmail' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(userService, 'createNewUser').resolves({
        type: 400,
        message: '"email" must be a valid email',
      });

      await userController.createNewUser(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"email" must be a valid email',
      });
    });
  });

  describe('Searching users', function () {
    it('Shows all users', async function () {
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(userService, 'getAllUsers').resolves(allUsers);

      await userController.getAllUsers({}, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allUsers);
    });

    it('Shows an user by id', async function () {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(userService, 'getUserById')
        .resolves({ type: null, message: allUsers[0] });

      await userController.getUserById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allUsers[0]);
    });

    it('Fails if the user id does not exists', async function () {
      const req = { params: { id: 999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(userService, 'getUserById')
        .resolves({ type: 404, message: 'User does not exist' });

      await userController.getUserById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'User does not exist',
      });
    });
  });

  describe('Deleting self user', function () {
    it('With success', async function () {
      const req = { user: { displayName: 'Watson' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon.stub(userService, 'deleteSelfUser').resolves();

      await userController.deleteSelfUser(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });
  });
});
