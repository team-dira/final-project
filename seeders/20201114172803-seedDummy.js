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
        avatar_url: 'David.png',
        str_number: '33.1.1.401.3.18.103711',
        work_address: 'RS Mitra Keluarga',
        password: '123',
        role: 'adviseryBoard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'arief rachman',
        username: 'arief',
        email: 'arief@mail.com',
        avatar_url: 'David.png',
        str_number: '33.1.1.401.3.18.103800',
        work_address: 'RS Mitra Keluarga',
        password: 'didadadida',
        role: 'doctor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'adrian',
        username: 'adss',
        email: 'adrian@mail.com',
        avatar_url: 'adrian.png',
        str_number: '33.1.1.405.3.18.103800',
        work_address: 'RS Mitra Keluarga',
        password: '123',
        role: 'adviseryBoard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bos Dira',
        username: 'dirabbieto',
        email: 'yoi@mail.com',
        avatar_url: 'dira.png',
        str_number: '33.1.1.405.3.18.103800',
        work_address: 'RS Mitra Keluarga',
        password: '123',
        role: 'adviseryBoard',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
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
