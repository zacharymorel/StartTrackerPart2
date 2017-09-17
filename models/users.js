'use strict';
const bcrypt = require('bcryptjs');

module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    password: {
      type: DataTypes.VIRTUAL,
      set: function (value) {
        const hash = bcrypt.hashSync(value, 8);
        this.setDataValue('passwordHash', hash);
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        Users.hasMany(models.ActivitiesDones, {
        foriegnKey: 'User'
          }) 
      }
    }
  });
  return Users;
};