import { GraphQLServer } from 'graphql-yoga';
import dotenv from 'dotenv';
dotenv.config();
import logger from 'morgan';
import schema from './schema';
import db, { User } from './models';
import { authenticate } from './passport';

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request })
});

db.sequelize.sync();

server.express.use(logger('dev'));
server.express.use(authenticate);

const handleListen = () => console.log(`✅ server on http://localhost:${PORT}`);

server.start({ port: PORT }, handleListen);