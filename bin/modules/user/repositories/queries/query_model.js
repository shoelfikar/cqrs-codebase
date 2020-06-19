const joi = require('joi');

const getUser = joi.object({
  userId: joi.string().required()
});

const loginUser = joi.object({
  email: joi.string().trim().email({ minDomainAtoms: 2 }).required(),
  password: joi.string().required()
});

const verifyOtpLogin = joi.object({
  userId: joi.string().required(),
  otp: joi.string().regex(/^[0-9]{4}$/).required()
});

const verifyOtpRegister = joi.object({
  userId: joi.string().required(),
  otp: joi.string().regex(/^[0-9]{4}$/).required()
});

module.exports = {
  getUser,
  loginUser,
  verifyOtpLogin,
  verifyOtpRegister
};
