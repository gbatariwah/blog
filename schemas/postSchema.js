const joi = require("joi")

module.exports = joi.object({
 title: joi.string().required().messages({
  "string.empty": "Please add a Title to post"
 }),
 imageUrl: joi.string().required().messages({
  "string.empty": "Please an image to the post"
 }),
 body: joi.string().required().min(20).messages({
  "string.empty": "Please add some content to the post"
 })
})