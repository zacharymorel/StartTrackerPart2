var express = require('express');
var router = express.Router();
const models = require('../models');

module.exports = (userActivities) => {

    // FINDALL FROM ACTIVITESDONES BY USERID TABLE MIDDLEWARE
    models.ActivitiesDones.getAll = () => {
        return models.ActivitiesDones.findAll({
            raw: true
        })
    }

    router.get('/useractivity', (req, res) => {
        models.ActivitiesDones.getAll().then(activityDone => {
            console.log("1", activityDone)
            res.send('hello world')
        })
    })

    return router;
}