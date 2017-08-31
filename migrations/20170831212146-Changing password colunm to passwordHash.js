'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.renameColumn('Users', 'password', 'passwordHash')
    
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.renameColumn('Users', 'passwordHash', 'password')
  }
};
