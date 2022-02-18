'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@groupomania.com',
      password: '$2a$10$S1ydNYAR8eGlgQsKVzwiRePUjLG8MIXc9momEw7Ev/Xj37mQtl9wq',
      admin: true,
      profession: "Chargée de communication",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
