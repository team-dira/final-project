'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('UserPosts', [
      {
        title: 'Testing Article',
        thumbnail_url: 'disease.png',
        caption: 'Lorem ipsum dolor sit amet bla bla bla',
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Testing Article',
        thumbnail_url: 'disease.png',
        caption: 'Lorem ipsum dolor sit amet bla bla bla',
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Testing Article',
        thumbnail_url: 'disease.png',
        caption: 'Lorem ipsum dolor sit amet bla bla bla',
        UserId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Testing Article',
        thumbnail_url: 'disease.png',
        caption: 'Lorem ipsum dolor sit amet bla bla bla',
        UserId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('UserPosts', null, {})
  }
};
