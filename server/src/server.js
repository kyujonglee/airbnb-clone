import './env';
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import passport from 'passport';
import schema from './schema';
import db from './models';
import { authenticate } from './passport';

import './passport';

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request })
});

db.sequelize.sync({ force: true });

server.express.use(logger('dev'));
server.express.use(authenticate);

const handleListen = () => console.log(`✅ server on http://localhost:${PORT}`);

server.start({ port: PORT }, handleListen);
