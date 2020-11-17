'use strict';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
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
        password: bcrypt.hashSync('123456', salt),
        speciality: 'Dermatologists',
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
        password: bcrypt.hashSync('123456', salt),
        speciality: 'Cardiologists',
        role: 'doctor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'adrian',
        username: 'adss',
        email: 'adrian@mail.com',
        avatar_url: 'https://minotar.net/bust/user/100.png',
        str_number: '33.1.1.405.3.18.103800',
        work_address: 'RS Mitra Keluarga',
        password: bcrypt.hashSync('123456', salt),
        speciality: 'Gastroenterologists',
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
        password: bcrypt.hashSync('123456', salt),
        speciality: 'Endocrinologists',
        role: 'adviseryBoard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  },
};
