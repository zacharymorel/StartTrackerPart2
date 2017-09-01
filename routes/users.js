var express = require('express');
var router = express.Router();

// ACTIVITES GET READ
router.get('/activities', (req, res) => {
  res.render('activities', {
    title: 'Welcome User!'
  })
})


module.exports = router;