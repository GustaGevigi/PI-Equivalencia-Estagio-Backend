'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = bcrypt.hashSync('admin', 10);
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Admin',
          email: 'admin@cps.sp.gov.br',
          password: password,
          cpf: '00000000000',
          role: 'administrator',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Users', null, {});
  },
};
