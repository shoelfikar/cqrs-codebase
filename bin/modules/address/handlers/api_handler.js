
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const queryModel = require('../repositories/queries/query_model');
const validator = require('../utils/validator');
const { SUCCESS:http } = require('../../../helpers/http-status/status_code');

const getAddresses = async (req, res) => {
  const postRequest = async () => {
    return queryHandler.getAddresses();
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get addresses fail')
      : wrapper.response(res, 'success', result, 'Get addresses success', http.OK);
  };
  sendResponse(await postRequest());
};

const getAddress = async (req, res) => {
  const payload = {
    addressId: req.params.addressId
  };
  const validatePayload = validator.isValidPayload(payload, queryModel.getAddress);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return queryHandler.getAddress(result.data);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get address fail')
      : wrapper.response(res, 'success', result, 'Get address success', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};

const createAddress = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.createAddress);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.createAddress(result.data);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Create address fail')
      : wrapper.response(res, 'success', result, 'Create address success', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};

const updateAddress = async (req, res) => {
  const payload = {
    addressId: req.params.addressId,
    ...req.body
  };
  const validatePayload = validator.isValidPayload(payload, commandModel.updateAddress);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.updateAddress(result.data);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Update address fail')
      : wrapper.response(res, 'success', result, 'Update address success', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};

const deleteAddress = async (req, res) => {
  const payload = {
    addressId: req.params.addressId
  };
  const validatePayload = validator.isValidPayload(payload, commandModel.addressId);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.deleteAddress(result.data);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Delete Address fail')
      : wrapper.response(res, 'success', result, 'Delete Address success', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  getAddresses,
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress
};
