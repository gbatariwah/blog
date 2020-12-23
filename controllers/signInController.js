const User = require("../models/User")
const signInSchema = require("../schemas/signInSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const generateCookie = require("../functions/generateCookie")

module.exports = {
  signIn: (req, res) => {
    
    res.render('sign-in', {email: req.session.email,
    password: req.session.password})
  },
  authenticate: async (req, res, next) => {
    try {
      const { error, value } = await signInSchema.validate(req.body)
      if (error) {
        throw new Error(error.message)
      }

      const user = await User.findOne({email: value.email})

      if(!user) {
        throw new Error("No user found with the email ")
      }
      
 const match = await user.verifyPassword(value.password)

 if(match) {
   const {password, ...currentUser} = {...user._doc}
   
   
   generateCookie(req,res, currentUser)
   
   req.flash("success", "Sign-In successful")
   res.locals.redirect = '/'
   req.session.email = ""
   req.session.password = ""
   next()
 } else {
   throw new Error('Invalid Password, Please re-enter your password')
 }
    } catch (error) {
      req.session.email = req.body.email
      req.session.password = req.body.password
      req.flash("error", error.message)
      res.locals.redirect = "/sign-in"
      next()
    }
  },
  redirect: (req, res, next) => {
    let redirectPath = res.locals.redirect
    if (redirectPath) res.redirect(redirectPath)
    else next()
  }
}
