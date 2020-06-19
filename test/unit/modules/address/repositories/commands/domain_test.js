const Address = require('../../../../../../bin/modules/address/repositories/commands/domain');
const command = require('../../../../../../bin/modules/address/repositories/commands/command');
const sinon = require('sinon');
const assert = require('assert');
const logger = require('../../../../../../bin/helpers/utils/logger');

describe('Address-commandDomain', () => {
  beforeEach(async () => {
    sinon.stub(logger, 'log');
    sinon.stub(logger, 'info');
    sinon.stub(logger, 'error');
  });

  afterEach(async () => {
    logger.log.restore();
    logger.info.restore();
    logger.error.restore();
  });

  describe('createAddress', () => {

    const db = {
      setCollection: sinon.stub()
    };

    const address = new Address(db);

    it('should return internal server error', async () => {
      let payload = {
        zipCode : '34342',
        city : 'Kendari',
        district : 'Kolaka',
        addresses : 'Jl.kemerdekaan no 10 b'
      };
      sinon.stub(command.prototype, 'insertOneAddress').resolves({err: true});
      const result = await address.createAddress(payload);
      command.prototype.insertOneAddress.restore();
      assert.equal(result.err.message, 'Internal server error');
    });

    it('should return success create address', async() => {
      let payload = {
        zipCode : '34342',
        city : 'Kendari',
        district : 'Kolaka',
        addresses : 'Jl.kemerdekaan no 10 b'
      };
      sinon.stub(command.prototype, 'insertOneAddress').resolves({err: null, data : {zipCode : '34342',}});
      const result = await address.createAddress(payload);
      command.prototype.insertOneAddress.restore();
      assert.equal(result.data.zipCode, '34342');
    });
  });

  describe('updateAddress', () => {

    const db = {
      setCollection: sinon.stub()
    };

    const address = new Address(db);

    it('should return internal server error', async() => {
      let queryResult = {
        err: true,
        data: ''
      };
      let payload = {
        zipCode : '34342',
        city : 'Kendari',
        district : 'Kolaka',
        addresses : 'Jl.kemerdekaan no 10 b'
      };
      sinon.stub(command.prototype, 'upsertOneAddress').resolves(queryResult);
      const result = await address.updateAddress(payload);
      command.prototype.upsertOneAddress.restore();
      assert.equal(result.err.message, 'Internal server error');
    });

    it('should return success update address', async() => {
      let queryResult = {
        err: null,
        data: {
          zipCode : '34342',
          city : 'Kendari',
          district : 'Kolaka',
          addresses : 'Jl.kemerdekaan no 10 b'
        }
      };
      let payload = {
        zipCode : '34342',
        city : 'Kendari',
        district : 'Kolaka',
        addresses : 'Jl.kemerdekaan no 10 b'
      };
      sinon.stub(command.prototype, 'upsertOneAddress').resolves(queryResult);
      const result = await address.updateAddress(payload);
      command.prototype.upsertOneAddress.restore();
      assert.equal(result.data.zipCode, '34342');
    });
  });

  describe('deleteAddress', () => {

    const db = {
      setCollection: sinon.stub()
    };

    const address = new Address(db);

    it('should return internal server error', async() => {
      let queryResult = {
        err: true,
        data: ''
      };
      let payload = {
        addressId : '520739a0-5724-4cae-a58e-11dcd6ffa022',
      };
      sinon.stub(command.prototype, 'deleteOneAddress').resolves(queryResult);
      const result = await address.deleteAddress(payload);
      command.prototype.deleteOneAddress.restore();
      assert.equal(result.err.message, 'Internal server error');
    });

    it('should return success update address', async() => {
      let queryResult = {
        err: null,
        data: ''
      };
      let payload = {
        addressId : '520739a0-5724-4cae-a58e-11dcd6ffa022',
      };
      sinon.stub(command.prototype, 'deleteOneAddress').resolves(queryResult);
      const result = await address.deleteAddress(payload);
      command.prototype.deleteOneAddress.restore();
      assert.equal(result.err, null);
    });
  });
});
