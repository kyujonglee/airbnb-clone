import {
  Reservation,
  User,
  Room,
  ReservationPerson,
  Person
} from '../../../models';

export default {
  Query: {
    findReservations: async (_, args) => {
      try {
        const reservations = await Reservation.findAll({
          include: [
            { model: Room },
            { model: User },
            { model: ReservationPerson, include: [Person] }
          ]
        });
        return reservations;
      } catch (error) {
        console.log(error);
        return [];
      }
    }
  }
};
