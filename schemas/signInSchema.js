const joi = require('joi')

module.exports = joi.object({
  email: joi.string().required().messages({
    'string.empty': 'Please enter your email',
  }),
  password: joi.string().required().messages({
    'string.empty': 'Please enter your password',
  }),
})
