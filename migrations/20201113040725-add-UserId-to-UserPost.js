'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'UserPosts',
      'UserId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          id: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('UserPosts', 'UserId', {});
  },
};
