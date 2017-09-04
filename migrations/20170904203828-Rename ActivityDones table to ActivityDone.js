'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.renameTable('ActivitiesDones', 'ActivitiesDone')
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.renameTable('ActivitiesDone', 'ActivitiesDones')
  }
};