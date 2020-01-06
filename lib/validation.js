// Validation
const Joi = require("@hapi/joi");

// register validation
const registerV = async data => {
  const userReg = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
    // repeat_password: Joi.ref("password"),
    // access_token: [Joi.string(), Joi.number()],
    email: Joi.string().email(/*{
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] }
  }*/)
  });

  return userReg.validate(data);
};

// login validation
const loginV = async data => {
  const userReg = Joi.object({
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string().email()
  });

  return userReg.validate(data);
};

module.exports = { registerV, loginV };
