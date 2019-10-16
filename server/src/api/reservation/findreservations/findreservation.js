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
      isAuthenticate(request);
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
