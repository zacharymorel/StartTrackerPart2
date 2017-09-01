const models = require('../models');
const bcrypt = require('bcryptjs');

const strategies = {
    serialize: (user, next) => {
        return next(null, user.id)
    },
    deserialize: (id, next) => {
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
    },
    login: (username, password, next) => {
        models.Users
            .findOne({
                where: {
                    username: username
                }
            })
            // console.log(username)
            .then(user => {
                // Check against the password
                if (bcrypt.compareSync(password, user.passwordHash)) {
                    return next(null, {
                        username: user.username,
                        id: user.id
                    });
                } else {
                    return next(null, false, {
                        message: "I'm sorry your not allowed in here!"
                    });
                }
            })
            .catch(err => {
                return next(err)
            })
    },
    signup: (username, password, next) => {

        let data = {
            username: username,
            password: password
        }
        models.Users
            .build(data)
            .save()
            .then(user => {
                // save to Database
                return next(null, {
                    username: user.username,
                    id: user.id
                })
            })
            .catch(err => {
                next(err)
            })
    }
};



module.exports = strategies;