import '@babel/polyfill';
import './env';
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import schema from './schema';
import db from './models';
import { authenticate } from './passport';

import './passport';
import authRouter from './authRouter';

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request })
});

db.sequelize.sync();

server.express.use(helmet());
server.express.use(cors());
server.express.use(cookieParser());
server.express.use(logger('dev'));
server.express.use(authenticate);

server.express.use(passport.initialize());

server.express.use('/auth', authRouter);

const handleListen = () => console.log(`✅ server on http://localhost:${PORT}`);

server.start({ port: PORT }, handleListen);
