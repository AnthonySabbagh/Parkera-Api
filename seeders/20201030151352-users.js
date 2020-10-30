module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_account', [{
      firstname: 'Bruno',
      lastname: 'Doe',
      email: 'bruno@doe.com',
      phone: '123',
      user_role: 'User',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstname: 'Emre',
      lastname: 'Smith',
      email: 'emre@smith.com',
      phone: '123',
      user_role: 'User',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstname: 'John',
      lastname: 'Stone',
      email: 'john@stone.com',
      phone: '123',
      user_role: 'User',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_account', null, {});
  }
};