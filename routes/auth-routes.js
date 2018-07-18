// routes/auth-routes.js
const express = require("express");
const authRoutes = express.Router();

const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

// User model
const User = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//show sign-up form 
authRoutes.get("/register", (req, res, next) => {
  res.render("auth/signup");
});

//handling user's signups
authRoutes.post("/register", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email    = req.body.email;
  const phoneNumber = req.body.phoneNumber;


  if (username === "" || password === "" || email === ""  ) {
    res.render("auth/signup", { message: "Please provide username, password and email" });
    return;
  }

  User.findOne({ username })
  .then(user => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      email,
      phoneNumber
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
          req.login(newUser, (err)  => {
            if (!err) {
              res.redirect("/");
            } else {
              console.log(err);
              res.redirect("/login", { message: "Please sign in" })
            }
          });
    }
  })
  .catch(error => {
    next(error)
  })
}) 
});

authRoutes.get("/login", (req, res, next) => {
    res.render("auth/login", { "message": req.flash("error") });
  });
  
authRoutes.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  }));


authRoutes.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
  });


authRoutes.get("/members", ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render("member/welcomeback");
  });

//handling editing user's profiles
authRoutes.get('/members/:userId/edit', (req, res, next)=>{
    User.findById(req.params.userId)
    .then((user)=>{
        res.render('member/editProfile', {user: user})
    })
    .catch((err)=>{
        next(err);
    })
 })  

//saving the edited user's profile
authRoutes.post('/members/:userId/update', (req, res, next)=>{
    User.findByIdAndUpdate(req.params.userId, {
        username: user.updUsername,
        email: user.updEmail,
        phoneNumber: user.updPhoneNumber,
        activity: user.updActivity,
        
    })
    .then((user)=>{
        res.redirect('/member/'+ user._id)
    })
    .catch((err)=>{
        next(err);
    })  
});

//deleting the user's profile
authRoutes.post('/members/:userId/delete', (req, res, next)=>{
  const id = req.params.userId;
    User.findByIdAndRemove(id)
    .then( () =>{
        res.redirect('/');
    })
    .catch( err => console.log("Error while deleting the account", err))
}); 

//viewing the user's profile
authRoutes.get('/members/:userId', (req, res, next) => {
    const userId = req.params.userId;
    User.findById(userId)
    .then((user)=>{  
        res.render('member/userDetails',  {theUser: user});
    })
    .catch((err)=>{
       next(err); 
    })

});    

module.exports = authRoutes;
