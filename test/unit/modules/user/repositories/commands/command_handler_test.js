const commandHandler = require('../../../../../../bin/modules/user/repositories/commands/command_handler');
const User = require('../../../../../../bin/modules/user/repositories/commands/domain');
const sinon = require('sinon');
const assert = require('assert');

describe('User-commandHandler', () => {

  const data = {
    success: true,
    data: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9',
    message: 'Your Request Has Been Processed',
    code: 200
  };

  const payload = {
    email: 'testing@gmail.com'
  };

  describe('createUser', () => {

    it('should return create user', async() => {
      sinon.stub(User.prototype, 'createUser').resolves(data);

      const rs = await commandHandler.createUser(payload);

      assert.notEqual(rs.data, null);
      assert.equal(rs.code, 200);

      User.prototype.createUser.restore();
    });
  });

  describe('updateUser', () => {

    it('should return update user', async() => {
      sinon.stub(User.prototype, 'updateUser').resolves(data);

      const rs = await commandHandler.updateUser(payload);

      assert.notEqual(rs.data, null);
      assert.equal(rs.code, 200);

      User.prototype.updateUser.restore();
    });
  });

  describe('deleteUser', () => {

    it('should return delete user', async() => {
      sinon.stub(User.prototype, 'deleteUser').resolves(data);

      const rs = await commandHandler.deleteUser(payload);

      assert.notEqual(rs.data, null);
      assert.equal(rs.code, 200);

      User.prototype.deleteUser.restore();
    });
  });
});
