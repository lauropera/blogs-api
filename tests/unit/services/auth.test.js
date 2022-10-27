const { expect } = require('chai');
const sinon = require('sinon');

const { authService } = require('../../../src/services');
const jwt = require('jsonwebtoken');
const { User } = require('../../../src/models');
const { newUser, loginMock } = require('../mocks/userMocks');

describe('Auth service', function () {
  it('Validate a login with success', async function () {
    sinon.stub(jwt, 'sign').resolves('token');
    sinon.stub(User, 'findOne').resolves({ dataValues: newUser });

    const result = await authService.validateLogin(loginMock);
    const resolvedResult = await Promise.resolve(result.message);
    expect(resolvedResult).to.equal('token');
  });

  // it('Validate a token with success', async function () {
  //   sinon.stub(jwt, 'verify').resolves({ data: 'token' });

  //   const result = authService.validateToken('token');
  //   const resolvedResult = await Promise.resolve(result);
  //   console.log('aqui', resolvedResult);
  //   expect(result.message).to.equal('token');
  // });
});
