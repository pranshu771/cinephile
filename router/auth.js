var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var localStrategy = require('passport-local');
var users = require('../models/users.js');
var userModel = require('../models/user.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(require('express-session')({
    secret: "I am Best",
    resave: false,
    saveUninitialized: false
}))
router.use(passport.initialize());
router.use(passport.session());
passport.use(new localStrategy(users.authenticate()));
passport.serializeUser(users.serializeUser());
passport.deserializeUser(users.deserializeUser());

router.get('/register',(req,res) => {
    res.sendfile('public/signup.html')
})

router.get('/login',(req,res) => {
    res.sendfile('public/login.html')
})

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err) }
      if (!user) {
        return res.send(info)
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send(user)
      });
    })(req, res, next);
});

  router.post('/register',(req,res) => {
    var newUser = new users({username: req.body.username});
    users.register(newUser,req.body.password,function(err,user){
        if(err) {
            return res.send(err);
        }
        passport.authenticate('local')(req,res,function() {
            userModel.create(user);
            return res.send(user);
            
    
        })
        
    });
     
})






function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()) {
        return next;
    }
    res.redirect('/login')
}

module.exports = router;


