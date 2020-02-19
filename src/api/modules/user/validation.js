// Validation
const Joi = require("@hapi/joi");

// register validation
const registerV = async data => {
  const user = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/),
    // repeat_password: Joi.ref("password"),
    // access_token: [Joi.string(), Joi.number()],
    email: Joi.string().email(/*{
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] }
  }*/)
  });

  return user.validate(data);
};

// login validation
const loginV = async data => {
  const user = Joi.object({
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/),
    username: Joi.string()
      .alphanum()
      .required(),
    email: Joi.string()
      .email()
      .required()
  });

  return user.validate(data);
};

module.exports = { registerV, loginV };
