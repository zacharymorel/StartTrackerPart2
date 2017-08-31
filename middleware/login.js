var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Users = require('./../models/users')

// LOGIN PASSPORT AUTHENTICATION 
passport.use('login', new LocalStrategy((username, password, next) => {
    models.Users
        .findOne({
            where: {
                username: username
            }
        })
        .then(user => {
            // Check againt the password
            if (bcrypt.compareSync(password, user.passwordHash)) {
                return next(null, {
                    username: user.username,
                    id: user.id
                })
            } else {
                return next(null, false, {
                    message: "I'm sorry your not allowed in here!"
                })
            }
        })
        .catch(err => {
            return next(err)
        })
}))

// BUILDING NEW USER
passport.use('signup', new LocalStrategy((username, password, next) => {
    let data = {
        username: username,
        password: password
    }
    models.Users
        .build(data)
        .save()
        .then(user => {
            // save to Database
            return next(null, user)
        })
        .catch(err =>
            next(err)
        )
}))

passport.serializeUser((user, next) => {
    next(null, user.id)
})

passport.deserializeUser(function (id, next) {
    models.Users.findOne({
        where: {
            id: id
        }
    }).then(user => {
        next(null, {
            username: user.username,
            id: user.id
        })
    })
})

// GET HOME PAGE
// CHANGE TO REFLECT LOGIN PAGE ***
router.get("/", function (req, res) {
    res.render("index", {
        title: "Express"
    });
});

// POST TO CHECK TO SEE IF USER IS CORRECT USER
router.post('/', passport.authenticate('login', {
    successRedriect: '/activities',
    failureRedirect: '/'
}));

// SIGNING UP PAGE
router.post('/signup', passport.authenticate('signup', {
    successRedriect: '/activities',
    failureRedirect: '/'
}))

// NEED Logout Here

// NEED restriced access on /activities/ to go here
module.exports = router;