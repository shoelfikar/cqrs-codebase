const joi = require('joi');

const createUser = joi.object({
  fullName: joi.string().required(),
  email: joi.string().trim().email({ minDomainAtoms: 2 }).required(),
  mobileNumber: joi.string().min(8).max(15).regex(/^(\+62|62|0)/).required(),
  password: joi.string().regex(/(?=\D*\d)[a-zA-Z0-9!@#$%^&*(),.?":{}|<>?]{6,}$/).required(),
});

const user = () => {
  const model = {
    userId: '',
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
    status: '',
    createdAt: '',
    lastModified: ''
  };
  return model;
};

const updateUser = joi.object({
  userId: joi.string().required(),
  fullName: joi.string().required(),
  mobileNumber: joi.string().min(8).max(15).regex(/^(\+62|62|0)/).required()
});

const userId = joi.object({
  userId: joi.string().required()
});

module.exports = {
  createUser,
  user,
  updateUser,
  userId
};
