const User = require('../../../../../../bin/modules/user/repositories/commands/domain');
const command = require('../../../../../../bin/modules/user/repositories/commands/command');
const query = require('../../../../../../bin/modules/user/repositories/queries/query');
const sinon = require('sinon');
const assert = require('assert');
const logger = require('../../../../../../bin/helpers/utils/logger');
describe('User-commandDomain', () =>{
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

  describe('createUser', () => {

    const db = {
      setCollection: sinon.stub()
    };

    const user = new User(db);

    it('should return error email is already taken', async() => {
      let queryResult = {
        err: null,
        data: {
          fullName : 'testing name',
          mobileNumber: '082385910989',
          email: 'testing@gmail.com',
          password : '$2sdhh2#2jnksadk',
        }
      };
      let payload = {
        fullName : 'testing name',
        mobileNumber: '082385910989',
        email: 'testing@gmail.com',
        password : 'aku123',
      };
      sinon.stub(query.prototype, 'findOneUser').resolves(queryResult);
      const result = await user.createUser(payload);
      query.prototype.findOneUser.restore();
      assert.equal(result.err.message, 'Email is already taken!');
    });

    it('should return internal server error', async() => {
      let queryResult = {
        err: true,
        data: ''
      };
      let payload = {
        fullName : 'testing name',
        mobileNumber: '082385910989',
        email: 'testing@gmail.com',
        password : 'aku123',
      };
      sinon.stub(query.prototype, 'findOneUser').resolves(queryResult);
      sinon.stub(command.prototype, 'insertOneUser').resolves({err: true});
      const result = await user.createUser(payload);
      query.prototype.findOneUser.restore();
      command.prototype.insertOneUser.restore();
      assert.equal(result.err.message, 'Internal server error');
    });

    it('should return success create user', async() => {
      let queryResult = {
        err: true,
        data: ''
      };
      let payload = {
        fullName : 'testing name',
        mobileNumber: '082385910989',
        email: 'testing@gmail.com',
        password : 'aku123',
      };
      sinon.stub(query.prototype, 'findOneUser').resolves(queryResult);
      sinon.stub(command.prototype, 'insertOneUser').resolves({err: null, data: { email: 'testing@gmail.com' }});
      const result = await user.createUser(payload);
      query.prototype.findOneUser.restore();
      command.prototype.insertOneUser.restore();
      assert.equal(result.data.email, 'testing@gmail.com');
    });
  });

  describe('updateUser', () => {

    const db = {
      setCollection: sinon.stub()
    };

    const user = new User(db);

    it('should return internal server error', async() => {
      let queryResult = {
        err: true,
        data: ''
      };
      let payload = {
        fullName : 'testing name',
        mobileNumber: '082385910989'
      };
      sinon.stub(command.prototype, 'upsertOneUser').resolves(queryResult);
      const result = await user.updateUser(payload);
      command.prototype.upsertOneUser.restore();
      assert.equal(result.err.message, 'Internal server error');
    });

    it('should return success update user', async() => {
      let queryResult = {
        err: null,
        data: {
          fullName : 'testing name',
          mobileNumber: '082385910989'
        }
      };
      let payload = {
        fullName : 'testing name',
        mobileNumber: '082385910989'
      };
      sinon.stub(command.prototype, 'upsertOneUser').resolves(queryResult);
      const result = await user.updateUser(payload);
      command.prototype.upsertOneUser.restore();
      assert.equal(result.data.fullName, 'testing name');
    });
  });

  describe('deleteUser', () => {

    const db = {
      setCollection: sinon.stub()
    };

    const user = new User(db);

    it('should return internal server error', async() => {
      let queryResult = {
        err: true,
        data: ''
      };
      let payload = {
        userId : 'blabla',
      };
      sinon.stub(command.prototype, 'deleteOneUser').resolves(queryResult);
      const result = await user.deleteUser(payload);
      command.prototype.deleteOneUser.restore();
      assert.equal(result.err.message, 'Internal server error');
    });

    it('should return success update user', async() => {
      let queryResult = {
        err: null,
        data: ''
      };
      let payload = {
        userId : 'blabla',
      };
      sinon.stub(command.prototype, 'deleteOneUser').resolves(queryResult);
      const result = await user.deleteUser(payload);
      command.prototype.deleteOneUser.restore();
      assert.equal(result.err, null);
    });
  });
});
