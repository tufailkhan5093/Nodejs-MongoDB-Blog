const db = require("../app/models");
const User = db.users;
const Blog = db.blogs;
const express = require('express');
const router = express();


router.get('/add_user', (async (req, res) => {

   res.render('add_user');

}));

router.post('/add_user', (async (req, res) => {
    const user = new User;
    user.user_name = req.body.user_name
    user.email = req.body.email;
    await user.save();
    res.redirect('/user/add_user');
}));
module.exports = router;