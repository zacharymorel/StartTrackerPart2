var express = require('express');
var router = express.Router();
const models = require('../models');

module.exports = (users) => {

  // RESTRICTED ACCESS CODE TO PREVENT NON USERS 
  // TO GO TO URL IF NOT LOGGED IN
  const restrictAccess = (req, res, next) => {
    if (req.user) {
      return next()
    } else {
      return res.redirect('/')
    }
  }

  // ACTIVITES GET READ
  router.get('/activities', restrictAccess, (req, res) => {
    res.render('activities', {
      title: req.user.username
    })
  })

  // CREATE A NEW ACTIVITY
  router.post('/activities', (req, res) => {
    models.Activity
  })

  return router;
}