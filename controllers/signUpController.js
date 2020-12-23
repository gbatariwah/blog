const userSchema = require("../schemas/userSchema")
const User = require("../models/User")
const generateCookie = require("../functions/generateCookie")


module.exports ={
 signUp: (req,res)=> {
  res.render("sign-up")
 },
 createNewUser: async (req,res,next)=> {
  try {
   const { error, value } = await userSchema.validate(req.body)
   if(error) {
    throw new Error(error.message)
   }
   const user = await User.create
   (value)
   req.flash("success", "Sign-Up successfull")
   const { password, ...currentUser } = { ...user._doc }
   generateCookie(req,res, currentUser)
   res.locals.redirect = '/'
   next()
  } catch (error) {
   req.flash("error", error.message)
   res.locals.redirect = "/sign-up"
   next()
  }
  
 },
 redirect: (req, res, next)=> {
   let redirectPath = res.locals.redirect
   if(redirectPath) res.redirect(redirectPath)
   else next()
 }
}