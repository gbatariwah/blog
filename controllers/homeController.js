const Post = require('../models/Post')
const jwt = require('jsonwebtoken')
module.exports = {
  home: async (req, res) => {
    const posts = await Post.find({})

    res.render('home', { posts })
  },
  contact: (req, res) => {
    res.render('contact')
  },
  about: (req, res) => {
    res.render('about')
  },
  signOut: (req, res) => {
    res.clearCookie('SSID')
    res.redirect('/')
  },
  post: async (req, res) => {
    try {
      const id = req.params.id
      const post = await Post.findById(id)
      if (!post) {
        throw new Error('Post not found')
      }

      res.render('post', { post })
    } catch (error) {}
  },
  deletePost: async (req, res) => {
    try {
      const id = req.params.id
      const token = await req.cookies['SSID']
      if (token) {
        const user = await jwt.verify(token, process.env.TOKEN_SECRET)
        if(user.isAdmin) {
         await Post.findOneAndDelete({_id: id})
         res.redirect("/")
        } else {
         throw new Error("You must be an admin to delete a post")
        }
      } else {
       throw new Error("Sign In to delete a post")
      }
    } catch (error) {
     console.log(error)
     res.redirect("/")
    }
  }
  
}
