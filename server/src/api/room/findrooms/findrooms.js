import { Room, Reservation } from '../../../models';
import db from '../../../models';

export default {
  Query: {
    findRooms: async (_, args) => {
      const {
        Sequelize: { Op }
      } = db;
      const { priceStart, priceEnd, checkIn, checkOut } = args;
      let _checkIn, _checkOut;
      if (checkIn) {
        _checkIn = new Date(checkIn);
      }
      if (checkOut) {
        _checkOut = new Date(checkOut);
      }
      try {
        let priceOptions = {};
        let dateOptions = {};
        if (priceStart && priceEnd) {
          priceOptions = {
            price: { [Op.between]: [priceStart, priceEnd] }
          };
        }
        if (_checkIn && _checkOut) {
          dateOptions = {
            [Op.or]: [
              {
                [Op.and]: [
                  { checkOut: { [Op.lte]: _checkOut } },
                  { checkIn: { [Op.gte]: _checkIn } }
                ]
              },
              {
                [Op.and]: [
                  { checkOut: { [Op.gte]: _checkOut } },
                  { checkIn: { [Op.lte]: _checkIn } }
                ]
              },
              {
                [Op.and]: [
                  { checkOut: { [Op.gte]: _checkOut } },
                  { checkIn: { [Op.between]: [_checkIn, _checkOut] } }
                ]
              },
              {
                [Op.and]: [
                  { checkOut: { [Op.between]: [_checkIn, _checkOut] } },
                  { checkIn: { [Op.lte]: _checkIn } }
                ]
              }
            ]
          };
        }
        const rooms = await Room.findAll({
          include: [
            {
              model: Reservation,
              required: false,
              where: dateOptions
            }
          ],
          where: priceOptions,
          order: [['rating', 'desc']]
        });
        if (_checkIn && _checkOut) {
          return rooms.filter(room => room.reservations.length === 0);
        } else {
          return rooms;
        }
      } catch (error) {
        return [];
      }
    }
  }
};
