import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as NaverStrategy } from 'passport-naver';
import { User } from './models';
import { naverLoginCallback } from './authController';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const verify = async (payload, done) => {
  try {
    const user = await User.findOne({ where: { id: payload.id } });
    if (user !== null) {
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

const naverOptions = {
  clientID: process.env.NAVER_CLIENTID,
  clientSecret: process.env.NAVER_CLIENT_SECRET,
  callbackURL: 'http://localhost:4000/auth/naver/callback'
};

passport.use(new JwtStrategy(jwtOptions, verify));
passport.use(new NaverStrategy(naverOptions, naverLoginCallback));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
