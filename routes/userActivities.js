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
                activitiesDones: activitiesDones
            })
        })
    })
    
    
    // To do: Find All activites tied to user specific id from ActivitiesDones 

    return router;
}