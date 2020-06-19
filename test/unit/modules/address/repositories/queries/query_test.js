const Query = require('../../../../../../bin/modules/address/repositories/queries/query');
const assert = require('assert');
const sinon = require('sinon');

describe('findAddresses', () => {
  const db = {
    setCollection: sinon.stub(),
    findMany: sinon.stub().resolves({
      'err': null,
      'data': [
        {
          '_id': '5bac53b45ea76b1e9bd58e1c',
          'zipCode': '101010',
          'city': 'makassar'
        }
      ]
    })
  };

  it('should return success get addresses', async() => {
    const query = new Query(db);
    const result = await query.findAddresses({});
    assert.notEqual(result.data, null);
    assert.equal(result.data.length, 1);
  });

});

describe('findOneAddress', () => {
  const db = {
    setCollection: sinon.stub(),
    findOne: sinon.stub().resolves({
      'err': null,
      'data': {
        'addressId': '520739a0-5724-4cae-a58e-11dcd6ffa022',
        'zipCode': '12345',
        'city': 'Bandung'
      }
    })
  };

  it('should return success get address', async() => {
    const query = new Query(db);
    const result = await query.findOneAddress({});
    assert.notEqual(result.data, null);
    assert.equal(result.data.city, 'Bandung');
  });
});
