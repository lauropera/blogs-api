const { expect } = require('chai');
const sinon = require('sinon');

const { authService } = require('../../../src/services');
const jwt = require('jsonwebtoken');
const { User } = require('../../../src/models');
const { newUser, loginMock } = require('../mocks/userMocks');

describe('Auth service', function () {
  afterEach(sinon.restore);

  describe('Logging in', function () {
    it('Validate a login with success', async function () {
      sinon.stub(jwt, 'sign').resolves('token');
      sinon.stub(User, 'findOne').resolves({ dataValues: newUser });

      const result = await authService.validateLogin(loginMock);
      const resolvedResult = await Promise.resolve(result.message);
      expect(resolvedResult).to.equal('token');
    });

    it('Fails if the login body is invalid', async function () {
      const result = await authService.validateLogin({ password: '123456' });
      const resolvedResult = await Promise.resolve(result);
      expect(resolvedResult.message).to.equal(
        'Some required fields are missing'
      );
    });

    it('Fails if some value is invalid', async function () {
      const result = await authService.validateLogin({
        email: 'a',
        password: '123456',
      });
      const resolvedResult = await Promise.resolve(result);
      expect(resolvedResult.message).to.equal('"email" must be a valid email');
    });

    it('Fails if the user has not been found', async function () {
      sinon.stub(User, 'findOne').resolves(undefined);
      const result = await authService.validateLogin(loginMock);
      expect(result.message).to.equal('Invalid fields');
    });
  });

  describe('Validating token', function () {
    it('Validate a token with success', async function () {
      sinon.stub(jwt, 'verify').resolves({ data: 'OK' });

      const result = await authService.validateToken('token');
      expect(result.message).to.equal('OK');
    });
  });
});
