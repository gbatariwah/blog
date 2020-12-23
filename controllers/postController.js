const Post = require("../models/Post")
const postSchema = require("../schemas/postSchema")
const jwt = require("jsonwebtoken")
module.exports = {
  newPost: (req, res) => {
    res.render('new-post')
  },
  authenticate: async (req, res, next) => {
    try {
      const token = req.cookies['SSID']
      if (token) {
        const user = jwt.verify(token, process.env.TOKEN_SECRET)
        if (user) {
          next()
        } else {
          throw new Error('You need to sign-in to create a new post')
        }
      } else {
        throw new Error('You need to sign-in to create a new post')
      }
    } catch (error) {
      req.flash('error', 'Please sign-in to view the page')
      global.user = null
      res.redirect('/sign-in')
    }
  },
  createNewPost: async (req, res, next) => {
    try {
      const image = req.files.image

      image.mv('public/images/posts/' + image.name)

      const { error, value } = await postSchema.validate({
        ...req.body,
        imageUrl: '/images/posts/' + image.name,
      })

      if (error) {
        throw new Error(error.message)
      }

      const post = await Post.create(value)
      req.flash('success', 'New post added')
      res.locals.redirect = '/'
      next()
    } catch (error) {
      req.flash('error', error.message)
      res.locals.redirect = '/new-post'
      next()
    }
  },
  redirect: (req, res, next) => {
    let redirectPath = res.locals.redirect
    if (redirectPath) res.redirect(redirectPath)
    else next()
  },
  edit: async (req, res) => {
    const id = req.params.id

    const post = await Post.findById(id)

    res.render('edit', { post })
  },
  update: async (req,res, next)=> {
    const id = req.params.id
    const post = await Post.findById(id)
  try {
    
    
    let updatedPost;
    if(!req.files) {
     updatedPost = {...req.body, imageUrl: post.imageUrl}
    } else {
     const image = req.files.image
     await image.mv('public/images/posts/' + image.name)
     updatedPost = { ...req.body, imageUrl: "/images/posts/" + image.name }
    }

    const {error, value} = await postSchema.validate(updatedPost)
    
    if(error) {
      throw new Error(error.message)
    } else {
      await Post.findByIdAndUpdate(id, {
        $set: value,
      })
      res.locals.redirect = '/'
      next()
    }

    
  } catch (error) {
   console.log(error.message)
   res.render('edit', {post})
   next()
  }
   
  }
}