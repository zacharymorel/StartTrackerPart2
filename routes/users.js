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
  res.render('home', {
    title: req.user.username,
  })
})

// CREATE A NEW ACTIVITY
router.post('/activities', (req, res) => {
  const CreateActivity = models.Activities.build({
    ActivityName: req.body.ActivityName
  })
  CreateActivity.save().then(activity => {
    res.redirect('/api/activities/complete')
  })
})

// SHOW ACTIVITY ADDED AND TO SHOW FORM TO ADD SPECIFIC
router.get('/activities/complete', (req, res) => {
  models.Activities.findAll().then(activities => {
    res.render('activities', {Activities: activities.ActivityName})
  })
})  

// ADD SPECIFIC TO ACTIVITYDONES TABLE
// router.post('/activites/complete', (req, res) => {
//   const completedActivity = models.ActivitiesDone.build({
//     UserId: req.user.username,
//     ActivityId: models.Activities.ActivityName,
//     Count: req.body.Count,
//     DateCompleted: Date.now()
//   })
//   completedActivity.save().then(completedActivity => {
//     res.render('activities')
//   })
// })
return router;
}