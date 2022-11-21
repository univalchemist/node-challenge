'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Movies', [{
      title: 'Darkest Hour',
      year: '2017',
      actorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
     }, {
      title: 'Leon',
      year: '1994',
      actorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
     }, {
      title: 'Pulp Fiction',
      year: '1994',
      actorId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
     }, {
      title: 'Fight Club',
      year: '1999',
      actorId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Movies', null, {});
  }
};
