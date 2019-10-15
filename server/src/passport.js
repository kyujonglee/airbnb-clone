import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './models';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const verify = async (payload, done) => {
  try {
    const user = await User.findOne({ where: { id: payload.id } });
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

export const authenticate = (req, res, next) =>
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

passport.use(new Strategy(jwtOptions, verify));
passport.initialize();
