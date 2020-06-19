const queryHandler = require('../../../../../../bin/modules/address/repositories/queries/query_handler');
const Address = require('../../../../../../bin/modules/address/repositories/queries/domain');
const sinon = require('sinon');
const assert = require('assert');

describe('Address-queryHandler', () => {

  const data = {
    success: true,
    data: '520739a0-5724-4cae-a58e-11dcd6ffa022',
    message: 'Your Request Has Been Processed',
    code: 200
  };

  const payload = {
    'addressId': '520739a0-5724-4cae-a58e-11dcd6ffa022'
  };

  describe('getAddresses', () => {

    it('should return get addresses', async() => {
      sinon.stub(Address.prototype, 'getAddresses').resolves(data);

      const rs = await queryHandler.getAddresses();

      assert.notEqual(rs.data, null);
      assert.equal(rs.code, 200);

      Address.prototype.getAddresses.restore();
    });
  });

  describe('getAddress', () => {

    it('should return get address', async() => {
      sinon.stub(Address.prototype, 'getAddress').resolves(data);

      const rs = await queryHandler.getAddress(payload);

      assert.notEqual(rs.data, null);
      assert.equal(rs.code, 200);

      Address.prototype.getAddress.restore();
    });
  });
});
