require("dotenv").config()
const express = require("express")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const flash = require("connect-flash")
const mongoose = require("mongoose")
const router = require("./routes/router")
const crypto = require("crypto")
var token = crypto.randomBytes(64).toString('hex')
const flashMessages = require("./middlewares/flashMessages")
const user = require("./middlewares/user")
const methodOverride = require('method-override')
const { strict } = require("assert")
global.user = null





const app = express()
const port = process.env.PORT || 3000
const dbUrl = process.env.DB_URL || "mongodb://localhost/blog_db"

//connect to db
mongoose.connect(dbUrl, {useNewUrlParser: true,
 useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true}).then(()=> {
 console.log("Connection to db successfull")
}).catch(error=> {
 console.log(error)
})

//middlewares
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload({
 useTempFiles: true,
 tempFileDir: "/public/tmp/"
}))
app.use(cookieParser())
app.use(session({
 secret: process.env.SESSION_SECRET,
 saveUninitialized: true,
 resave: false,
 cookie: {
  httpOnly:true,
  maxAge: 1000 * 60 * 60,
  path: "/",
  sameSite: true,
 }
}))
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
)
app.use(flash())
app.use(flashMessages)
app.use("*", user)
app.use('/', router)





app.listen(port, ()=> {
 console.log("Server running on port " + port)
})

