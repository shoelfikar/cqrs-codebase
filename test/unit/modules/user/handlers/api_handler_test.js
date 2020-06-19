const sinon = require('sinon');
const { expect } = require('chai');
const userHandler = require('../../../../../bin/modules/user/handlers/api_handler');
const commandHandler = require('../../../../../bin/modules/user/repositories/commands/command_handler');
const queryHandler = require('../../../../../bin/modules/user/repositories/queries/query_handler');
const validator = require('../../../../../bin/modules/user/utils/validator');

describe('User Api Handler', () => {

  let res;
  beforeEach(() => {
    res = {
      send: function () {
        return true;
      }
    };
  });

  const req = {
    body: {},
    params: {},
    query: {},
    authorization: {
      credentials: 'xx'
    }
  };

  const resultSucces = {
    err: null,
    message: 'success',
    data: [],
    code: 200
  };

  const resultError = {
    err: true
  };

  describe('getUsers', () => {
    it('Should return error', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(queryHandler, 'getUsers').resolves(resultError);
      expect(await userHandler.getUsers(req, res));
      validator.isValidPayload.restore();
      queryHandler.getUsers.restore();
    });
    it('Should return success', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(queryHandler, 'getUsers').resolves(resultSucces);
      expect(await userHandler.getUsers(req, res));
      validator.isValidPayload.restore();
      queryHandler.getUsers.restore();
    });
  });

  describe('getUser', () => {
    it('should cover error validation', async () => {
      await userHandler.getUser(req, res);
    });
    it('Should return error', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(queryHandler, 'getUser').resolves(resultError);
      expect(await userHandler.getUser(req, res));
      validator.isValidPayload.restore();
      queryHandler.getUser.restore();
    });
    it('Should return success', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(queryHandler, 'getUser').resolves(resultSucces);
      expect(await userHandler.getUser(req, res));
      validator.isValidPayload.restore();
      queryHandler.getUser.restore();
    });
  });

  describe('createUser', () => {
    it('should cover error validation', async () => {
      await userHandler.createUser(req, res);
    });
    it('Should return error', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(commandHandler, 'createUser').resolves(resultError);
      expect(await userHandler.createUser(req, res));
      validator.isValidPayload.restore();
      commandHandler.createUser.restore();
    });
    it('Should return success', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(commandHandler, 'createUser').resolves(resultSucces);
      expect(await userHandler.createUser(req, res));
      validator.isValidPayload.restore();
      commandHandler.createUser.restore();
    });
  });

  describe('updateUser', () => {
    it('should cover error validation', async () => {
      await userHandler.updateUser(req, res);
    });
    it('Should return error', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(commandHandler, 'updateUser').resolves(resultError);
      expect(await userHandler.updateUser(req, res));
      validator.isValidPayload.restore();
      commandHandler.updateUser.restore();
    });
    it('Should return success', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(commandHandler, 'updateUser').resolves(resultSucces);
      expect(await userHandler.updateUser(req, res));
      validator.isValidPayload.restore();
      commandHandler.updateUser.restore();
    });
  });

  describe('deleteUser', () => {
    it('should cover error validation', async () => {
      await userHandler.deleteUser(req, res);
    });
    it('Should return error', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(commandHandler, 'deleteUser').resolves(resultError);
      expect(await userHandler.deleteUser(req, res));
      validator.isValidPayload.restore();
      commandHandler.deleteUser.restore();
    });
    it('Should return success', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(commandHandler, 'deleteUser').resolves(resultSucces);
      expect(await userHandler.deleteUser(req, res));
      validator.isValidPayload.restore();
      commandHandler.deleteUser.restore();
    });
  });
});
