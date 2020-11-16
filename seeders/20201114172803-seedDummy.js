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
    await queryInterface.bulkInsert('Users', [
      {
        name: 'David Smith',
        username: 'David32prof',
        email: 'David@mail.com',
        avatar_url: 'https://randomuser.me/api/portraits/men/72.jpg',
        str_number: '33.1.1.401.3.18.103711',
        work_address: 'RS Mitra Keluarga',
        password: '123',
        role: 'adviseryBoard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ardira Fariz Pasha',
        username: 'dirabbieto',
        email: 'dira@mail.com',
        avatar_url: 'https://randomuser.me/api/portraits/men/71.jpg',
        str_number: '33.1.1.401.3.18.103800',
        work_address: 'RS Mitra Keluarga',
        password: 'didadadida',
        role: 'doctor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Nadya Patricia',
        username: 'chameleonsoul',
        email: 'nadya@mail.com',
        avatar_url: 'https://randomuser.me/api/portraits/women/72.jpg',
        str_number: '33.1.1.405.3.18.103800',
        work_address: 'RS Mitra Keluarga',
        password: '123',
        role: 'adviseryBoard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ridwan Wiriandi',
        username: 'iwa',
        email: 'Ridwan@mail.com',
        avatar_url: 'https://randomuser.me/api/portraits/men/80.jpg',
        str_number: '33.1.1.405.3.18.103800',
        work_address: 'RS Mitra Keluarga',
        password: '123',
        role: 'adviseryBoard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
};
