const assert = require('assert');
const sinon = require('sinon');
const Command = require('../../../../../../bin/modules/address/repositories/commands/command');


describe('Address-command', () => {

  describe('insertOneAddress', () => {
    const queryResult = {
      err: null,
      data: {
        _id: '5ed5c9d79f01d231dc7563c4',
        zipCode: '101010',
        city: 'Makassar',
        district: 'Tamalanrea',
        addresses: 'Jl.perintis kemerdekaan no 2'
      }
    };

    it('should success to insert data to db', async() => {
      const db = {
        insertOne: sinon.stub().resolves(queryResult),
        setCollection: sinon.stub()
      };
      const command = new Command(db);
      const res = await command.insertOneAddress({});
      assert.equal(res.data.zipCode, queryResult.data.zipCode);
    });
  });

  describe('upsertOneAddress', () => {
    const queryResult = {
      err: null,
      data: {
        _id: '5ed5c9d79f01d231dc7563c4',
        zipCode: '101010',
        city: 'Makassar',
        district: 'Tamalanrea',
        addresses: 'Jl.perintis kemerdekaan no 2'
      }
    };

    it('should success to update data to db', async() => {

      const db = {
        upsertOne: sinon.stub().resolves(queryResult),
        setCollection: sinon.stub()
      };
      const command = new Command(db);
      const res = await command.upsertOneAddress({});
      assert.equal(res.data.addresses, queryResult.data.addresses);
    });
  });

  describe('deleteOneAddress', () => {
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
      const res = await command.deleteOneAddress({});
      assert.equal(res.err, null);
    });
  });
});
