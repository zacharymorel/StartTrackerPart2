'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Users',
      'passwordHash', {
        type: Sequelize.STRING,
        allowNull: false
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Users',
      'passwordHash', {
        type: Sequelize.TEXT,
        allowNull: false
      }
    )
  }
};