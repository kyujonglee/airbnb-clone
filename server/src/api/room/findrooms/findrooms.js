import { Room, Reservation } from '../../../models';
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
        let priceOptions = {};
        let dateOptions = {};
        if (priceStart && priceEnd) {
          priceOptions = {
            ...priceOptions,
            price: { [Op.between]: [priceStart, priceEnd] }
          };
        }
        if (checkIn && checkOut) {
          dateOptions = {
            ...dateOptions,
            [Op.or]: [
              { checkOut: { [Op.lt]: checkIn } },
              { checkIn: { [Op.gt]: checkOut } }
            ]
          };
        }
        const rooms = await Room.findAll({
          include: [
            {
              model: Reservation,
              where: dateOptions
            }
          ],
          where: priceOptions
        });
        return rooms;
      } catch (error) {
        console.log(error);
        return [];
      }
    }
  }
};
