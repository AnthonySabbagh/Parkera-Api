module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('park_spots', [{
      address: '417 Nelsom Street',
      longitude: 23.3,
      latitude: 43.8,
      price: 12.67,
      createdAt: new Date(),
      updatedAt: new Date(),
      userAccountId: 2
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('park_spots', null, {});
  }
};