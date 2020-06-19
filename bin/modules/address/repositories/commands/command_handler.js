
const Address = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));

const createAddress = async (payload) => {
  const address = new Address(db);
  const postCommand = async payload => address.createAddress(payload);
  return postCommand(payload);
};

const updateAddress = async (payload) => {
  const address = new Address(db);
  const postCommand = async payload => address.updateAddress(payload);
  return postCommand(payload);
};

const deleteAddress = async (payload) => {
  const address = new Address(db);
  const postCommand = async payload => address.deleteAddress(payload);
  return postCommand(payload);
};


module.exports = {
  createAddress,
  updateAddress,
  deleteAddress
};
