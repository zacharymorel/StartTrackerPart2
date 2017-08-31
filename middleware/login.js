const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const models = require('./../models')

// login Passport Middleware goes here
passport.use("login", new LocalStrategy(username, password, next) => {
    models.Users
        .findOne({
                where: {
                    username: username
                })
            .then(user => {
                // 
            })
        })
})