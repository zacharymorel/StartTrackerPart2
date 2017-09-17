'use strict';
module.exports = function(sequelize, DataTypes) {
  var ActivitiesDones = sequelize.define('ActivitiesDones', {
    UserId: DataTypes.INTEGER,
    ActivityId: DataTypes.INTEGER,
    DateCompleted: DataTypes.DATE,
    Count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // calls the associate function and then runs all the models 
        ActivitiesDones.hasMany(models.Activities, {
          foriegnKey: 'ActivityName' 
          }) 
      }
    }
  });
  return ActivitiesDones;
};