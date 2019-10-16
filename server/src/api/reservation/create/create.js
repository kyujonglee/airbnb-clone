import { Reservation } from '../../../models';
import { isAuthenticate } from '../../../middlewares';

export default {
  Mutation: {
    createReservation: async (_, args, { request }) => {
      isAuthenticate(request);
      let { checkIn, checkOut, roomId } = args;
      const {
        user: { id: userId }
      } = request;
      if (checkIn) checkIn = new Date(checkIn);
      if (checkOut) checkOut = new Date(checkOut);
      try {
        const reservation = await Reservation.create({
          checkIn,
          checkOut,
          roomId,
          userId
        });
        return reservation;
      } catch (error) {
        throw Error(`can't create reservation`);
      }
    }
  }
};
