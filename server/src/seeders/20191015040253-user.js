import bcrypt from 'bcrypt';

export default {
  up: async (queryInterface, Sequelize) => {
    const saltRounds = 10;
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'KyuKyu',
          naverId: 'fdkslfjdsfjdfjs'
        },
        {
          name: 'beautiful name',
          naverId: 'fjdiojfdkfnfdifjdk1'
        }
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
