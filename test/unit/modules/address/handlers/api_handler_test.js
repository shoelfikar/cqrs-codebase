const sinon = require('sinon');
const { expect } = require('chai');
const addressHandler = require('../../../../../bin/modules/address/handlers/api_handler');
const commandHandler = require('../../../../../bin/modules/address/repositories/commands/command_handler');
const queryHandler = require('../../../../../bin/modules/address/repositories/queries/query_handler');
const validator = require('../../../../../bin/modules/address/utils/validator');

describe('Address API Handler', () => {

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

  describe('createAddress', () => {
    it('should cover error validation', async () => {
      await addressHandler.createAddress(req, res);
    });
    it('Should return error', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(commandHandler, 'createAddress').resolves(resultError);
      expect(await addressHandler.createAddress(req, res));
      validator.isValidPayload.restore();
      commandHandler.createAddress.restore();
    });
    it('Should return success', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(commandHandler, 'createAddress').resolves(resultSucces);
      expect(await addressHandler.createAddress(req, res));
      validator.isValidPayload.restore();
      commandHandler.createAddress.restore();
    });
  });

  describe('getAddresses', () => {
    it('should cover error validation', async () => {
      await addressHandler.getAddresses(req, res);
    });
    it('Should return error', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(queryHandler, 'getAddresses').resolves(resultError);
      expect(await addressHandler.getAddresses(req, res));
      validator.isValidPayload.restore();
      queryHandler.getAddresses.restore();
    });
    it('Should return success', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(queryHandler, 'getAddresses').resolves(resultSucces);
      expect(await addressHandler.getAddresses(req, res));
      validator.isValidPayload.restore();
      queryHandler.getAddresses.restore();
    });
  });

  describe('getAddress', () => {
    it('should cover error validation', async () => {
      await addressHandler.getAddress(req, res);
    });
    it('Should return error', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(queryHandler, 'getAddress').resolves(resultError);
      expect(await addressHandler.getAddress(req, res));
      validator.isValidPayload.restore();
      queryHandler.getAddress.restore();
    });
    it('Should return success', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(queryHandler, 'getAddress').resolves(resultSucces);
      expect(await addressHandler.getAddress(req, res));
      validator.isValidPayload.restore();
      queryHandler.getAddress.restore();
    });
  });

  describe('updateAddress', () => {
    it('should cover error validation', async () => {
      await addressHandler.updateAddress(req, res);
    });
    it('Should return error', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(commandHandler, 'updateAddress').resolves(resultError);
      expect(await addressHandler.updateAddress(req, res));
      validator.isValidPayload.restore();
      commandHandler.updateAddress.restore();
    });
    it('Should return success', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(commandHandler, 'updateAddress').resolves(resultSucces);
      expect(await addressHandler.updateAddress(req, res));
      validator.isValidPayload.restore();
      commandHandler.updateAddress.restore();
    });
  });

  describe('deleteAddress', () => {
    it('should cover error validation', async () => {
      await addressHandler.deleteAddress(req, res);
    });
    it('Should return error', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(commandHandler, 'deleteAddress').resolves(resultError);
      expect(await addressHandler.deleteAddress(req, res));
      validator.isValidPayload.restore();
      commandHandler.deleteAddress.restore();
    });
    it('Should return success', async () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: true,
        data: {}
      });
      sinon.stub(commandHandler, 'deleteAddress').resolves(resultSucces);
      expect(await addressHandler.deleteAddress(req, res));
      validator.isValidPayload.restore();
      commandHandler.deleteAddress.restore();
    });
  });
});
