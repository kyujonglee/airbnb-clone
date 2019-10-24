import { Reservation, ReservationPerson } from '../../../models';
import { isAuthenticate } from '../../../middlewares';
import db from '../../../models';

const personMap = {
  adult: 1,
  child: 2,
  baby: 3
};

const reservationPerson = async ({ person, count, reservationId }) => {
  if (count) {
    await ReservationPerson.create({
      personId: personMap[person],
      count,
      reservationId
    });
  }
};

export default {
  Mutation: {
    createReservation: async (_, args, { request }) => {
      isAuthenticate(request);
      let { checkIn, checkOut, roomId, adult, child, baby } = args;
      const {
        user: { id: userId }
      } = request;
      if (checkIn) checkIn = new Date(checkIn);
      if (checkOut) checkOut = new Date(checkOut);
      let transaction;
      try {
        transaction = await db.sequelize.transaction();
        const reservation = await Reservation.create({
          checkIn,
          checkOut,
          roomId,
          userId
        });
        const { id: reservationId } = reservation;
        await reservationPerson({ person: 'adult', count: adult, reservationId });
        await reservationPerson({ person: 'child', count: child, reservationId });
        await reservationPerson({ person: 'baby', count: baby, reservationId });
        await transaction.commit();
        return true;
      } catch (error) {
        console.log(error);
        if (transaction) await transaction.rollback();
        throw Error(`can't create reservation`);
      }
    }
  }
};
