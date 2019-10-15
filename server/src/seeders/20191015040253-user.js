module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'kyujong93@naver.com',
          password: 'toddlf20',
          name: 'KyuKyu'
        },
        {
          email: 'kyujong93@gmail.com',
          password: 'toddlf20',
          name: 'beautiful name'
        }
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
