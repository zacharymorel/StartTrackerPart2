'use strict';
module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    password: DataTypes.TEXT,
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
        // associations can be defined here
      }
    }
  });
  return Users;
};