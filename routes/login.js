var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const models = require('../models');

// AUTHENTICATION  SIGNUP & LOGIN PROCESS HERE


module.exports = (passport) => {
    // LOGIN PASSPORT AUTHENTICATION 
    // GET HOME LOGIN PAGE
    router.get("/", function (req, res) {
        res.render("Login", {
            title: "Login Here!"
        });
    });

    // POST LOGIN AUTHENTICATE CORRECT USER
    router.post('/', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/signup'
    }));

    // GET SIGNUP USER
    router.get('/signup', (req, res) => {
        res.render("signup", {
            title: 'Sign Up Here!'
        });
    });

    // SIGNING UP POST
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/'
    }));

    // LOGOUT HERE
    router.get('/logout', (req, res) => {
        // clear the sessions
        req.session.destroy();
        // logout of passport
        req.logOut();
        res.redirect('/');
    });

    return router;
};