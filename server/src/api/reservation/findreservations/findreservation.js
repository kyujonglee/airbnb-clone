import {
  Reservation,
  User,
  Room,
  ReservationPerson,
  Person
} from '../../../models';
import { isAuthenticate } from '../../../middlewares';

export default {
  Query: {
    findReservations: (_, __, { request }) => {
      try {
        return Reservation.findAll({
          include: [
            { model: Room },
            { model: User },
            { model: ReservationPerson, include: [Person] }
          ]
        });
      } catch (error) {
        console.log(error);
        return [];
      }
    }
  }
};
