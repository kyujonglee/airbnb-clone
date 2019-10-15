'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Rooms',
      [
        {
          price: 120000,
          rating: 4.5,
          title: `'I SETTE CONI - TRULLO EDERA'`,
          content: `Spend a unforgettable holiday in the enchanting surroundings of the town of Cisternino (reachable from the near airports of Bari and Brindisi).
          Trullo Edera offers a heaven of peace and tranquillity, set in an elevated position with a stunning view.`,
          imgPath:
            'https://a0.muscache.com/im/pictures/15273358/d7329e9a_original.jpg?aki_policy=xx_large',
          bedroom: 1,
          bed: 1,
          bathroom: 1
        },
        {
          price: 123000,
          rating: 4.9,
          title: '(독채) 경복궁과 청와대 5분거리 리노베이션 한옥',
          content: `1934년 지어진 한옥을 2011-2012년 에 집 전체를 리노베이션 한 고급 한옥입니다.
          한옥을 독채로 빌릴 수 있기 때문에 다른 사람들의 방해를 받지 않고 이용할 수 있습니다.
          호스트는 같은 집에서 생활하지 않으며, 편한 시간에 셀프체크인 할 수 있습니다.
          이 한옥은 4인 가족이 쾌적하게 사용할 수 있도록 세팅되어 있습니다.`,
          imgPath:
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
