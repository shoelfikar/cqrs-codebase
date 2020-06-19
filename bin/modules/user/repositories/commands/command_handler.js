
const User = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));

const createUser = async (payload) => {
  const user = new User(db);
  const postCommand = async payload => user.createUser(payload);
  return postCommand(payload);
};

const updateUser = async (payload) => {
  const user = new User(db);
  const postCommand = async payload => user.updateUser(payload);
  return postCommand(payload);
};

const deleteUser = async (payload) => {
  const user = new User(db);
  const postCommand = async payload => user.deleteUser(payload);
  return postCommand(payload);
};

module.exports = {
  createUser,
  updateUser,
  deleteUser
};
