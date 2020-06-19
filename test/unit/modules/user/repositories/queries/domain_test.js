const User = require('../../../../../../bin/modules/user/repositories/queries/domain');
const query = require('../../../../../../bin/modules/user/repositories/queries/query');
const sinon = require('sinon');
const assert = require('assert');
const logger = require('../../../../../../bin/helpers/utils/logger');

describe('User-queryDomain', () =>{
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

  describe('getUsers', () => {

    const db = {
      setCollection: sinon.stub()
    };

    const user = new User(db);

    it('should return not found error', async() => {
      let queryResult = {
        err: true,
        data: ''
      };
      sinon.stub(query.prototype, 'findUsers').resolves(queryResult);
      const result = await user.getUsers();
      query.prototype.findUsers.restore();
      assert.notEqual(result.err, null);
    });

    it('should return get users success', async() => {
      let queryResult = {
        err: null,
        data: [
          {
            userId: 'blabla',
            email: 'blabla@gmail.com',
            password: '$2asdwehkj2#2iuhd'
          }
        ]
      };
      sinon.stub(query.prototype, 'findUsers').resolves(queryResult);
      const result = await user.getUsers();
      query.prototype.findUsers.restore();
      assert.equal(result.data.length, 1);
    });
  });

  describe('getUser', () => {

    const db = {
      setCollection: sinon.stub()
    };

    const user = new User(db);

    it('should return not found error', async() => {
      let queryResult = {
        err: true,
        data: ''
      };
      let payload = {
        userId: 'blabla'
      };
      sinon.stub(query.prototype, 'findOneUser').resolves(queryResult);
      const result = await user.getUser(payload);
      query.prototype.findOneUser.restore();
      assert.notEqual(result.err, null);
    });

    it('should return get user success', async() => {
      let queryResult = {
        err: null,
        data: {
          userId: 'blabla',
          email: 'blabla@gmail.com'
        }
      };
      let payload = {
        userId: 'blabla'
      };
      sinon.stub(query.prototype, 'findOneUser').resolves(queryResult);
      const result = await user.getUser(payload);
      query.prototype.findOneUser.restore();
      assert.equal(result.data.email, 'blabla@gmail.com');
    });
  });
});
