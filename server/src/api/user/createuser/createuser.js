import bcrypt from 'bcrypt';
import { User } from '../../../models';
import { generateToken } from '../../../util';

const saltRounds = 10;

export default {
  Mutation: {
    createUser: async (_, args) => {
      const { email, password, name } = args;
      try {
        const findUser = await User.findOne({ where: { email } });
        if (findUser) {
          throw Error('This user is already exists');
        }
        const encrpytPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({
          email,
          password: encrpytPassword,
          name
        });
        const token = generateToken({ id: user.id });
        return token;
      } catch (error) {
        console.log(error);
        throw Error("Can't create user");
      }
    }
  }
};
