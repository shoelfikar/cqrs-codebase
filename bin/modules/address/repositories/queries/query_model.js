const joi = require('joi');

const getAddress = joi.object({
  addressId: joi.string().required()
});

module.exports = {
  getAddress
};
