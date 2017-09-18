'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
      queryInterface.addColumn(
        'ActivitiesDones',
        'ActivitiesDoneId', {
          type: Sequelize.INTEGER
        }
      )
    },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('ActivitiesDones', 'ActivitiesDoneId')
  }
};