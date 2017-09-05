var express = require('express');
var router = express.Router();
const models = require('../models');

module.exports = (users) => {

  // FINDALL FROM ACTIVITES TABLE MIDDLEWARE
  models.Activities.getAll = () => {
    return models.Activities.findAll({
      raw: true
    })
  }

  // RESTRICTED ACCESS CODE TO PREVENT NON USERS 
  // TO GO TO URL IF NOT LOGGED IN
  const restrictAccess = (req, res, next) => {
    if (req.user) {
      return next()
    } else {
      return res.redirect('/')
    }
  }

  // SHOW HOME, WHERE: ACTIVITY CREATE, LIST ALL ACTIVITIES, FORM TO ADD SPECIFIC
  router.get('/home', restrictAccess, (req, res) => {
    models.Activities.getAll().then(activities => {
      res.render('home', {
        title: req.user.username,
        activities: activities
      })
    })
  })

  // CREATE A NEW ACTIVITY
  router.post('/activities', (req, res) => {
    const CreateActivity = models.Activities.build({
      ActivityName: req.body.ActivityName
    })
    CreateActivity.save().then(activity => {
      res.redirect('/api/home')
    })
  })

  // DELETE A ACTIVITY ON HOME PAGE
  router.post('/activities/delete', (req, res) => {
    const id = parseInt(req.body.activityId)
    console.log(id)
    console.log(typeof (id))
    models.Activities.destroy({
      where: {
        id: id
      }
    }).then (whatsLeft => {
      res.redirect('/api/home')
    })
  })   
  // ^^^ **********BUGGED*********

  // ADD SPECIFIC TO ACTIVITYDONES TABLE
  router.post('/activities/tracking', (req, res) => {
    const SpecificActivity = models.ActivitiesDones.build({
      UserId: req.user.id,
      ActivityId: req.body.activityId,
      DateCompleted: Date.now(),
      Count: req.body.Count
    })
    SpecificActivity.save().then(SpecificActivities => {
      res.redirect('/api/home')
    })
  })

  // CHANGE API ROUTES TO PROPER API CALLS
  // RENDER/REDIRECT TO URL .I.E /HOME not /API/HOME

  return router;
}