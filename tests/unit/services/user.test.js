const { expect } = require('chai');
const sinon = require('sinon');

const { User } = require('../../../src/models');
const { userService } = require('../../../src/services');
const { allUsers } = require('../mocks/userMocks');

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
      sinon.stub(User, 'create').resolves();
      const result = await userService.createNewUser();
      expect(result.message).to.deep.equal();
    });
  });
});
