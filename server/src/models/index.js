import path from 'path';
import Sequelize from 'sequelize';
import UserModel from './user';
import RoomModel from './room';
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.js'))[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export const User = UserModel(sequelize, Sequelize);

export const Room = RoomModel(sequelize, Sequelize);

export default db;
