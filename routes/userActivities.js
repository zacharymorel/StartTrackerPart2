var express = require('express');
var router = express.Router();
const models = require('../models');

module.exports = (userActivities) => {

    // FINDALL FROM ACTIVITESDONES TABLE BY USERID
    router.get('/useractivity', (req, res) => {
        models.ActivitiesDones.findAll({
                includes: [
                    { model: models.Activities }
                ],
                where: {
                    UserId: req.user.id
                }
            }).then(activitiesDones => {
                if (activitiesDones === []) {
                    res.render('noActivities', {
                        title: req.user.username,
                        empty: 'It appears you don\'t have any activites your tracking.'
                    })
                } else {
                    res.render('userActivity', {
                        title: req.user.username,
                        activitiesDones: activitiesDones
                    })
                }

            })
            .catch(err => {
                res.redirect('/')
            })
    })

    // FIND THE SPECIFIC ACTIVITY BY IT'S ACTIVITYID AND RENDER SPECIFIC PAGE
    router.get(`/useractivity/:ActivityId`, (req, res) => {
        const id = req.params.ActivityId
        const activityid = parseInt(id)

        models.ActivitiesDones.findOne({
            where: {
                ActivityId: activityid},
                raw: true
            }).then(activityInfo => {
                const activity = {
                    title: req.user.username,
                    ActivityId: activityInfo.ActivityId,
                    Count: activityInfo.Count,
                    DateCompleted: activityInfo.DateCompleted,
                    createdAt: activityInfo.createdAt,
                    updatedAt: activityInfo.updatedAt
                }
            res.render('specificUserActivity', activity)
        })
    })

    // UPDATING USER SPECIFIC ACTIVITY
    router.post('/api/activities/:id/update', (req, res) => {
        const id = parseInt(req.body.ActivityId)
        models.ActivitiesDones.update({
            Count: req.body.Count
        },
        {
            where: {
                ActivityId: id
            }        
        }).then(updatedActivity => {
            res.redirect('/useractivity')
        })
    })

    // DELETEING SPECIFIC USER ACTIVITY
    router.post('/api/activities/:id/delete', (req, res) => {
        const id = parseInt(req.body.ActivityId)
        models.ActivitiesDones.destroy({
          where: {
            ActivityId: id
          }
        }).then(whatsLeft => {
          res.redirect('/home')
        })
      })
    // Left off here, need get delete working for specific Activity

    return router;
}