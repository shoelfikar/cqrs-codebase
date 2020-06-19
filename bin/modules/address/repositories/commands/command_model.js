const joi = require('joi');

const createAddress = joi.object({
  zipCode: joi.string().min(3).required(),
  province: joi.string().required(),
  city: joi.string().required(),
  district: joi.string().required(),
  subDistrict: joi.string().required(),
  address: joi.string().required()
});

const address = () => {
  const model = {
    addressId: '',
    zipCode: '',
    province: '',
    city: '',
    district: '',
    subDistrict: '',
    address: '',
    createdAt: '',
    lastModified: ''
  };
  return model;
};

const updateAddress = joi.object({
  addressId: joi.string().required(),
  zipCode: joi.string().required(),
  province: joi.string().required(),
  city: joi.string().required(),
  district: joi.string().required(),
  subDistrict: joi.string().required(),
  address: joi.string().required()
});

const addressId = joi.object({
  addressId: joi.string().required()
});

module.exports = {
  createAddress,
  address,
  updateAddress,
  addressId
};
