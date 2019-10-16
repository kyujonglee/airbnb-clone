export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'reservations',
      [
        {
          checkIn: new Date(2019, 11, 11),
          checkOut: new Date(2019, 11, 13),
          userId: 1,
          roomId: 2
        },
        {
          checkIn: new Date(2019, 11, 20),
          checkOut: new Date(2019, 11, 25),
          userId: 2,
          roomId: 1
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('reservations', null, {});
  }
};
