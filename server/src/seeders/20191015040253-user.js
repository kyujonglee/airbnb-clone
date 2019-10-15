import bcrypt from 'bcrypt';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const saltRounds = 10;
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'kyujong93@naver.com',
          password: await bcrypt.hash('toddlf20', saltRounds),
          name: 'KyuKyu'
        },
        {
          email: 'kyujong93@gmail.com',
          password: await bcrypt.hash('toddlf20', saltRounds),
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
