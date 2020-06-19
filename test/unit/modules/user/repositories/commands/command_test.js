const assert = require('assert');
const sinon = require('sinon');

const Command = require('../../../../../../bin/modules/user/repositories/commands/command');

describe('User-command', () => {

  describe('insertOneUser', () => {
    const queryResult = {
      err: null,
      data: {
        _id: '5bac53b45ea76b1e9bd58e1c',
        email: 'testing@gmail.com',
        password: '$2asdUHdsa&sadnj'
      }
    };

    it('should success to insert data to db', async() => {

      const db = {
        insertOne: sinon.stub().resolves(queryResult),
        setCollection: sinon.stub()
      };
      const command = new Command(db);
      const res = await command.insertOneUser({});
      assert.equal(res.data.username, queryResult.data.username);
    });
  });

  describe('upsertOneUser', () => {
    const queryResult = {
      err: null,
      data: {
        _id: '5bac53b45ea76b1e9bd58e1c',
        email: 'testing@gmail.com',
        password: '$2asdUHdsa&sadnj'
      }
    };

    it('should success to update data to db', async() => {

      const db = {
        upsertOne: sinon.stub().resolves(queryResult),
        setCollection: sinon.stub()
      };
      const command = new Command(db);
      const res = await command.upsertOneUser({});
      assert.equal(res.data.username, queryResult.data.username);
    });
  });

  describe('deleteOneUser', () => {
    const queryResult = {
      err: null,
      data: ''
    };

    it('should success to delete data from db', async() => {

      const db = {
        deleteOne: sinon.stub().resolves(queryResult),
        setCollection: sinon.stub()
      };
      const command = new Command(db);
      const res = await command.deleteOneUser({});
      assert.equal(res.err, null);
    });
  });
});
