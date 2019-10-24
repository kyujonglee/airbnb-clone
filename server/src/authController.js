import passport from 'passport';
import bcrypt from 'bcrypt';
import { User } from './models';
import { generateToken } from './util';

export const naverLogin = passport.authenticate('naver');

export const naverLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const { id, emails, displayName } = profile;
  let user = await User.findOne({ where: { naverId: id } });
  try {
    if (!user) {
      const saltRounds = 10;
      user = await User.create({
        email: emails[0].value,
        name: displayName,
        password: await bcrypt.hash('naver', saltRounds),
        naverId: id
      });
    }
    return cb(null, user);
  } catch (error) {
    return cb(error);
  }
};

export const createToken = (req, res) => {
  const token = generateToken({ id: req.user.id });
  res.cookie('token', token);
  res.redirect('http://localhost:3000');
};
