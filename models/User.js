const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema({
 name: String,
 email: String,
 password: String,
 isAdmin: {
  type: Boolean,
  default: false
 }
}, {timestamps: true})

userSchema.pre("save", function(next) {
 let user = this
 bcrypt.hash(user.password, 10).then(hash=> {
  user.password = hash
  next()
 }).catch(error=> {
  console.log(error)
  next(error)
 })
})

userSchema.methods.verifyPassword = function(inputPassword) {
 let user = this
 return bcrypt.compare(inputPassword, user.password)
}
const User = mongoose.model("User", userSchema)

module.exports = User
