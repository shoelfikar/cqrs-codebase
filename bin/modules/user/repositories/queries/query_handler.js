
const User = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));
const user = new User(db);

const loginUser = async (data) => {
  const getData = async () => {
    const result = await user.loginUser(data);
    return result;
  };
  const result = await getData();
  return result;
};

const verifyOtpLogin = async (data) => {
  const getData = async () => {
    const result = await user.verifyOtpLogin(data);
    return result;
  };
  const result = await getData();
  return result;
};

const verifyOtpRegister = async (data) => {
  const getData = async () => {
    const result = await user.verifyOtpRegister(data);
    return result;
  };
  const result = await getData();
  return result;
};

const getUsers = async () => {
  const getData = async () => {
    const result = await user.getUsers();
    return result;
  };
  const result = await getData();
  return result;
};

const getUser = async (data) => {
  const getData = async () => {
    const result = await user.getUser(data);
    return result;
  };
  const result = await getData();
  return result;
};

module.exports = {
  loginUser,
  verifyOtpLogin,
  verifyOtpRegister,
  getUsers,
  getUser
};
