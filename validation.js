const joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = joi.object({
    name: joi.string().min(5).max(20),
    email: joi.string().required().email(),
    password: joi.string().required().min(6).max(20),
  });
  return schema.validate(data);
};
const loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(6).max(20),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
