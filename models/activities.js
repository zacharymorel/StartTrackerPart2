'use strict';
module.exports = function(sequelize, DataTypes) {
  var Activities = sequelize.define('Activities', {
    ActivityName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        model.Activities.hasMany(models.ActivitiesDone)
      }
    }
  });
  return Activities;
};