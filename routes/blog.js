const db = require("../app/models");
const User = db.users;
const Blog = db.blogs;
const express = require('express');
const router = express();
const multer = require('multer')
const path = require('path')
const formidable = require("formidable");
const fs = require("fs");
const { userInfo } = require("os");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `Images`)
  },
  filename: (req, file, cb) => {
    cb(null, path.basename(file.originalname, path.extname(file.originalname)))
  }
})

//ADD BLOG
router.get('/add_blog', (async (req, res) => {
  const users = await User.find();
  res.render('add_blog', { users: users });
}));

//EDIT BLOG
router.post('/edit_blog', (async (req, res) => {
  const blog = await Blog.findById(req.body.id);
  const users = await User.find();
  res.render('edit_blog', { users: users, blog: blog });
}));

//DELETE BLOG
router.post('/delete_blog', (async (req, res) => {
  const blog = await Blog.findByIdAndRemove(req.body.id);
  return redirect('/home');

}));

//ADD BLOG
router.post('/add_blog', (async (req, res) => {
  var formData = new formidable.IncomingForm();
  formData.parse(req, function (error, fields, files) {
    var oldPath = files.file.filepath;
    var newPath = "Images/" + files.file.originalFilename;
    fs.rename(oldPath, newPath, async function (err) {
      const blog = new Blog;
      blog.title = fields.title;
      blog.description = fields.description;
      blog.image = newPath,
        blog.user_name = fields.user_name;
      await blog.save();
      res.send(true);

    })
  })
}));

//EDIT BLOG POST METHOD
router.post('/editblog', (async (req, res) => {

  var formData = new formidable.IncomingForm();
  formData.parse(req, function (error, fields, files) {
    var oldPath = files.file.filepath;

    var newPath = "Images/" + files.file.originalFilename;
    fs.rename(oldPath, newPath, async function (err) {

      const blog = await Blog.findById(fields.id);
      blog.title = fields.title;
      blog.description = fields.description;
      blog.image = newPath,
        blog.user_name = fields.user_name;
      await blog.save();
      res.send(true);

    })
  })
}));


//HOME PAGE
router.get('/home', (async (req, res) => {

  const blogs = await Blog.find();
  res.render('home', { blogs: blogs });

}));

//BLOG DETAIL PAGE
router.post('/blog_detail', (async (req, res) => {
  const blogs = await Blog.findById({ _id: req.body.id });
  res.render('blog_detail', { blogs: blogs });

}));


module.exports = router;
