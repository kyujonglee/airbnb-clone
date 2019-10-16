import bcrypt from 'bcrypt';

export default {
  up: async (queryInterface, Sequelize) => {
    const saltRounds = 10;
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'KyuKyu',
          email: 'kyujong93@naver.com',
          password : await bcrypt.hash('toddlf20', saltRounds),
          naverId: 'fdkslfjdsfjdfjs'
        },
        {
          name: 'beautiful name',
          email: 'kyujong93@gmail.com',
          password : await bcrypt.hash('toddlf20', saltRounds),
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
