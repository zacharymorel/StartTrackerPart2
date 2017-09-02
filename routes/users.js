var express = require('express');
var router = express.Router();

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
    title: 'Welcome User!'
  })
})


module.exports = router;