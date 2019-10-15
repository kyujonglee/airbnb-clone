'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Rooms',
      [
        {
          price: 120000,
          rating: 4.5,
          title: 'I SETTE CONI - TRULLO EDERA',
          content: '인원 4명 침실 1개 침대 1개 욕실 1개',
          img_path:
            'https://a0.muscache.com/im/pictures/15273358/d7329e9a_original.jpg?aki_policy=xx_large',
          bedroom: 1,
          bed: 1,
          bathroom: 1
        },
        {
          price: 123000,
          rating: 4.9,
          title: '(독채) 경복궁과 청와대 5분거리 리노베이션 한옥',
          content: '인원 4명 침실 2개 침대 0개 욕실 2개',
          img_path:
            'https://a0.muscache.com/im/pictures/4230043/7e9a64d3_original.jpg?aki_policy=xx_large',
          bedroom: 1,
          bed: 2,
          bathroom: 1
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rooms', null, {});
  }
};
