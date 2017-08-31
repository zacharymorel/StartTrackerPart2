'use strict';
module.exports = function(sequelize, DataTypes) {
  var ActivitiesDone = sequelize.define('ActivitiesDone', {
    UserId: DataTypes.INTEGER,
    ActivityId: DataTypes.INTEGER,
    DateCompleted: DataTypes.DATE,
    Count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ActivitiesDone;
};