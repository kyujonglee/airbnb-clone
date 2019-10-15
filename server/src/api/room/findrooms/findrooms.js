import { Room } from '../../../models';

export default {
  Query: {
    findRooms: async (_, args) => {
      try {
        const rooms = await Room.findAll({});
        return rooms;
      } catch (error) {
        return [];
      }
    }
  }
};
