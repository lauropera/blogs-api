const { expect } = require('chai');
const sinon = require('sinon');

const { User } = require('../../../src/models');
const { userService } = require('../../../src/services');
const { allUsers, newUser } = require('../mocks/userMocks');
const jwt = require('jsonwebtoken');

describe('User service', function () {
  afterEach(sinon.restore);

  describe('Searching for users', function () {
    it('Show all users', async function () {
      sinon.stub(User, 'findAll').resolves(allUsers);
      const result = await userService.getAllUsers();
      expect(result).to.deep.equal(allUsers);
    });

    it('Show an user by id', async function () {
      sinon.stub(User, 'findAll').resolves(allUsers[0]);
      const result = await userService.getUserById(1);
      expect(result.message).to.deep.equal(allUsers[0]);
    });

    it('Fails if the id is invalid', async function () {
      sinon.stub(User, 'findAll').resolves(undefined);
      const result = await userService.getUserById(999);
      expect(result.message).to.deep.equal('User does not exist');
    });
  });

  describe('Creating a new user', function () {
    it('Create a new user', async function () {
      sinon.stub(jwt, 'sign').resolves('token');
      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(User, 'create').resolves(newUser);

      const result = await userService.createNewUser(newUser);
      const resolvedResult = await Promise.resolve(result.message);
      expect(resolvedResult).to.equal('token');
    });

    it('Fails if the email already exists', async function () {
      sinon.stub(User, 'findOne').resolves(allUsers[0]);
      sinon.stub(User, 'create').resolves(newUser);

      const result = await userService.createNewUser(newUser);
      expect(result.message).to.equal('User already registered');
    });

    it('Fails if an information is invalid', async function () {
      const result = await userService.createNewUser({
        ...newUser,
        email: 'invalid',
      });
      expect(result.message).to.equal('"email" must be a valid email');
    });
  });

  describe('Deleting an user', function () {
    it('Deletes an user', async function () {
      sinon.stub(User, 'findOne').resolves(allUsers[0]);
      sinon.stub(User, 'destroy').resolves(1);

      const result = await userService.deleteSelfUser();
      expect(result).to.equal(1);
    });
  });
});
