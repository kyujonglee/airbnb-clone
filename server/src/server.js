import { GraphQLServer } from 'graphql-yoga';
import dotenv from 'dotenv';
dotenv.config();
import logger from 'morgan';
import schema from './schema';
import db, { User } from './models';

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request })
});

db.sequelize.sync({ force: true });

server.express.use(logger('dev'));

const handleListen = () => console.log(`✅ server on http://localhost:${PORT}`);

server.start({ port: PORT }, handleListen);
