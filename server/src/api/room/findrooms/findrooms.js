import { Room } from '../../../models';

export default {
  Query: {
    findRooms: (_, args) => {
      try {
        return Room.findAll({});
      } catch (error) {
        return [];
      }
    }
  }
};
