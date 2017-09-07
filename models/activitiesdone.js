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
        // associations can be defined here
      }
    }
  });
  return ActivitiesDones;
};