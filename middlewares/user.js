const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
  try {
    const token = await req.cookies['SSID']
    if (token) {
      const user = await jwt.verify(token, process.env.TOKEN_SECRET)
      global.user = user
      next()
    } else {
      global.user = null
      next()
    }
  } catch (error) {
    global.user = null
    next()
  }
}
