var express = require('express');
var router = express.Router();
const models = require('../models');

module.exports = (userActivities) => {

    // FINDALL FROM ACTIVITESDONES TABLE BY USERID
    router.get('/useractivity', (req, res) => {
        models.ActivitiesDones.findAll({
                where: {
                    UserId: req.user.id
                },
                raw: true
            }).then(activitiesDones => {
                console.log('1', activitiesDones)
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

    router.get(`/useractivity/:ActivityId`, (req, res) => {
        const id = req.params.ActivityId
        const activityid = parseInt(id)
        // console.log("2", typeof activityid, activityid)
        res.render('specificUserActivity', {
            title: activityid
        })
    })
    // Wokring on individual pages rendering for user Tracking activities
    return router;
}