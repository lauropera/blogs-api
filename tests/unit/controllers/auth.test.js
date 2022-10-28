const chai = require('chai');
const sinon = require('sinon');

chai.use(require('chai-http'));
const { expect } = chai;

const { authController } = require('../../../src/controllers');
const { authService } = require('../../../src/services');

describe('Auth controller', function () {
  afterEach(sinon.restore);

  it('User logs in successfully', async function () {
    const req = {
      body: {
        email: 'test@test.com',
        password: '123456',
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(authService, 'validateLogin')
      .resolves({ type: null, message: 'token' });

    await authController.login(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ token: 'token' });
  });

  it('Fails if some information is wrong', async function () {
    const req = {
      body: {
        email: 'invalidEmail',
        password: '123456',
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(authService, 'validateLogin')
      .resolves({ type: 'INVALID_FIELDS', message: 'Invalid fields' });

    await authController.login(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: 'Invalid fields' });
  });

  it('Fails if some information is missing', async function () {
    const req = {
      body: {
        email: '',
        password: '123456',
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(authService, 'validateLogin').resolves({
      type: 'MISSING_FIELDS',
      message: 'Some required fields are missing',
    });

    await authController.login(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: 'Some required fields are missing',
    });
  });
});
