import bcrypt from 'bcrypt';
import { User } from '../../../models';
import { generateToken } from '../../../util';

export default {
  Mutation: {
    createToken: async (_, args) => {
      const { email, password } = args;
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          throw Error('email is wrong');
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = generateToken({ id: user.id });
          return token;
        }
        throw Error('check your password');
      } catch (error) {
        throw Error('cannot find user');
      }
    }
  }
};
