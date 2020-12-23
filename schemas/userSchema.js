const joi = require("joi")

module.exports = joi.object({
 name: joi.string().required().messages({
  "string.empty": "Please enter your username"
 }),
 email: joi.string().required().messages({
  "string.empty": "Please enter your email"
 }),
 password: joi.string().required().messages({
  "string.empty": "Please enter your password"
 })
})