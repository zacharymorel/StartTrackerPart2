var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const models = require('../models');




// NEED restriced access on /activities to go here
module.exports =  (passport) => {
    // LOGIN PASSPORT AUTHENTICATION 
    // GET HOME LOGIN PAGE
    router.get("/", function (req, res) {
        res.render("Login", {
            title: "Login Here!"
        });
    });
    
    // POST LOGIN AUTHENTICATE CORRECT USER
    router.post('/', passport.authenticate('login', {
        successRedriect: '/api/activities',
        failureRedirect: '/'
    }));
    
    // GET SIGNUP USER
    router.get('/signup', (req, res) => {
        res.render("signup", {
            title: 'Sign Up Here!'
        })
    })
    
    // SIGNING UP POST
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/api/activities',
        failureRedirect: '/'
    }))
    // NEED Logout Here
    
    return router;
    
}