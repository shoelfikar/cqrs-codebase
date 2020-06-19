
const assert = require('assert');
const sinon = require('sinon');

const Query = require('../../../../../../bin/modules/user/repositories/queries/query');

describe('findUsers', () => {
  const db = {
    setCollection: sinon.stub(),
    findMany: sinon.stub().resolves({
      'err': null,
      'data': [
        {
          '_id': '5bac53b45ea76b1e9bd58e1c',
          'username': 'codebase',
          'password': 'aku123'
        }
      ]
    })
  };

  it('should return success get users', async() => {
    const query = new Query(db);
    const result = await query.findUsers({});
    assert.notEqual(result.data, null);
    assert.equal(result.data.length, 1);
  });
});

describe('findOneUser', () => {
  const db = {
    setCollection: sinon.stub(),
    findOne: sinon.stub().resolves({
      'err': null,
      'data': {
        '_id': '5bac53b45ea76b1e9bd58e1c',
        'username': 'codebase',
        'password': 'aku123'
      }
    })
  };

  it('should return success get user', async() => {
    const query = new Query(db);
    const result = await query.findOneUser({});
    assert.notEqual(result.data, null);
    assert.equal(result.data.username, 'codebase');
  });
});
