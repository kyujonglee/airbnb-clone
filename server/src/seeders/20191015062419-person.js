export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'people',
      [
        {
          name: '성인'
        },
        {
          name: '어린이'
        },
        {
          name: '유아'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('people', null, {});
  }
};
