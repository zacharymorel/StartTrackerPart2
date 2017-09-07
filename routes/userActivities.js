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
            res.render('userActivity', {
                title: req.user.username,
                activitiesDones: activitiesDones
            })
        })
        .catch(err => {
            res.send('I\'m sorry, it looks like you have no actitivies' )
        })
    })
      
    router.get('/useractivity/{id}', (req, res) => {
        res.send('hello world')
    })
    // Wokring on individual pages rendering for user Tracking activities
    return router;
}