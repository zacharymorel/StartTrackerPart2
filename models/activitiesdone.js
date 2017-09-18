'use strict';
module.exports = function(sequelize, DataTypes) {
  var ActivitiesDones = sequelize.define('ActivitiesDones', {
    UserId: DataTypes.INTEGER,
    ActivityId: DataTypes.INTEGER,
    DateCompleted: DataTypes.DATE,
    Count: DataTypes.INTEGER
  });
  
    ActivitiesDones.associate = (models) => {
        // calls the associate function and then runs all the models 
        models.ActivitiesDones.belongsTo(models.Activities)
        models.ActivitiesDones.belongsTo(models.Users)
      };

  return ActivitiesDones;
};