var express = require('express');
var router = express.Router();
const models = require('../models');

module.exports = (userActivities) => {

    // FINDALL FROM ACTIVITESDONES TABLE BY USERID
    router.get('/useractivity', (req, res) => {
        models.ActivitiesDones.findAll({
                where: {
                    UserId: req.session.passport.user
                }
            }).then(ActivitiesDones => {

                // ActivitiesDones[0].getActivity().then(activity => console.log('1.75', activity.ActivityName))
                // ^^ this is the fancy way to get and set that the ORM is using to create tasks and query tasks based off of associations
                models.Activities.findAll({
                    where: {
                        id: {$in: ActivitiesDones.map(x => x.ActivityId)} 
                    }
                }).then(myActivities => {
                    // console.log('2', myActivities)
                    res.render('userActivity', {
                        ActivitiesDones: ActivitiesDones,
                        myActivities: myActivities
                    })
                })
            })
            .catch(err => {
                console.log('3', err)
                res.redirect('/')
            })
    })

    // FIND THE SPECIFIC ACTIVITY BY IT'S ACTIVITYID AND RENDER SPECIFIC PAGE
    router.get(`/useractivity/:Id`, (req, res) => {
        const id = req.params.Id
        const activityid = parseInt(id)

        models.ActivitiesDones.findOne({
            where: {
                ActivityId: activityid
            }
        }).then(ActivitiesDones => {
            // console.log('2', ActivitiesDones)
            models.Activities.findAll({
                where: {
                    id: ActivitiesDones.ActivityId
                }
            }).then(myActivities => {
                // console.log('3', myActivities)
                // console.log('2.5', myActivities[0].dataValues.ActivityName)
                // const ActivityNameValue =  myActivities[0].dataValues.ActivityName
                // console.log('9', ActivityNameValue)
                const activity = {
                    ActivityName: myActivities[0].dataValues.ActivityName,
                    Count: ActivitiesDones.Count,
                    DateCompleted: ActivitiesDones.DateCompleted,
                    createdAt: ActivitiesDones.createdAt,
                    updatedAt: ActivitiesDones.updatedAt
                }
                res.render('specificUserActivity', activity)
            })
        }) 
        .catch(err => {
            console.log('3', err)
            res.redirect('/')
        })
    })

    // parent.map( (eachActivity, index) => {
    //     eachActivity[index].datavalue.ActivyName
    //     console.log(eachActivity[index].datavalues.ActivyName)
    // })
    
    // UPDATING USER SPECIFIC ACTIVITY
    router.post('/api/activities/:id/update', (req, res) => {
        const id = parseInt(req.body.ActivityId)
        models.ActivitiesDones.update({
            Count: req.body.Count
        }, {
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