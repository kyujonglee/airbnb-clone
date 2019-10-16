import { Room } from '../../../models';
import db from '../../../models';

export default {
  Query: {
    findRooms: async (_, args) => {
      const {
        Sequelize: { Op }
      } = db;
      let { priceStart, priceEnd, checkIn, checkOut } = args;
      if (checkIn) checkIn = new Date(checkIn);
      if (checkOut) checkOut = new Date(checkOut);
      try {
        let options = {};
        const rooms = await Room.findAll({
          where: {
            price: { [Op.between]: [priceStart, priceEnd] },
            include: [{model: Reservation}]
          }
        });
        return rooms;
      } catch (error) {
        console.log(error);
        return [];
      }
    }
  }
};
