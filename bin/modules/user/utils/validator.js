const joi = require('joi');
const validate = require('validate.js');
const wrapper = require('../../../helpers/utils/wrapper');
const { ConflictError } = require('../../../helpers/error');

const isValidPayload = (payload, constraint) => {
  const { value, error } = joi.validate(payload, constraint);
  if(!validate.isEmpty(error)){
    let message = error.details[0].message;
    return wrapper.error(new ConflictError(message));
  }
  return wrapper.data(value, 'success', 200);

};

module.exports = {
  isValidPayload
};
