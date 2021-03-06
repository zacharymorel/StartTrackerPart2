'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'ActivitiesDones',
      'ActivitiesDonesName', {
        type: Sequelize.STRING
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('ActivitiesDones', 'ActivitiesDonesName')
  }
};