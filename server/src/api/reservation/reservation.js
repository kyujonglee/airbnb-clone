export default {
  Reservation: {
    countPeople: ({ reservation_people }) => {
      return reservation_people.reduce((acc, person) => {
        return acc + person.count;
      }, 0);
    }
  }
};
