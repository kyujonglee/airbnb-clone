import express from 'express';
import { naverLogin, createToken } from './authController';
import passport from 'passport';

const authRouter = express.Router();

authRouter.get('/naver', naverLogin);
authRouter.get('/naver/callback', passport.authenticate('naver'), createToken);

export default authRouter;
