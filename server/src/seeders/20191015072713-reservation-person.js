export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'reservation_people',
      [
        {
          count: 2,
          reservationId: 1,
          personId: 1
        },
        {
          count: 1,
          reservationId: 1,
          personId: 2
        },
        {
          count: 1,
          reservationId: 2,
          personId: 3
        },
        {
          count: 4,
          reservationId: 2,
          personId: 1
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('reservation_people', null, {});
  }
};
