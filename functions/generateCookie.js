const jwt = require("jsonwebtoken")







module.exports = (req,res,currentUser) => {
  const token = jwt.sign(currentUser, process.env.TOKEN_SECRET, {
    expiresIn: 1000 * 60 * 60,
  })
  res.cookie('SSID', token, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    sameSite: true,
  })
  
}