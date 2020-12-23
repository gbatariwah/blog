const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
 title: String,
 body: String,
 imageUrl: String
}, {timestamps: true})

const Post = mongoose.model("Post", postSchema)

module.exports = Post