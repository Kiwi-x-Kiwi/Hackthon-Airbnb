const express = require('express');
const router = express.Router();

const User = require('../models/User')

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;
const passport = require('passport');


router.get('/signup', (req, res, next) => {

  res.render('user/signup');

})


router.post('/signup', (req, res, next) => {

  let username = req.body.theUsername;
  let password = req.body.thePassword;

  let salt = bcrypt.genSaltSync(bcryptSalt);
  let hashPass = bcrypt.hashSync(password, salt);

  User.create({
      username: username,
      password: hashPass,
      //isAdmin: admin
    })
    .then((result) => {

      res.redirect('/');


    })
    .catch((err) => {
      next(err);
    })
})


//route to login page
router.get('/login', (req, res, next) => {

  res.render('user/login')

})


//route for actually login in. if successful, takes you to celebrity page, if not back to login in again.
router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/user/login",
  failureFlash: true,
  passReqToCallback: true
}));


router.get("/logout", (req, res, next) => {

  req.logout(); //passport specific logout. without passport we use req.session.destroy()
  res.redirect("/user/login");

});


module.exports = router;