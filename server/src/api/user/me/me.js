import { User } from '../../../models';

export default {
  Query: {
    me: (_, __, { request }) => {
      const {
        user: { id }
      } = request;
      return User.findOne({ where: { id } });
    }
  }
};
