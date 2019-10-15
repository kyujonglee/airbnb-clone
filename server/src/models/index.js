import path from 'path';
import Sequelize from 'sequelize';
import UserModel from './user';
import RoomModel from './room';
import PersonModel from './person';
import ReservationModel from './reservation';
import ReservationPersonModel from './reservation_person';
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

export const ReservationPerson = ReservationPersonModel(sequelize, Sequelize);
export const Reservation = ReservationModel(sequelize, Sequelize);
export const User = UserModel(sequelize, Sequelize);
export const Room = RoomModel(sequelize, Sequelize);
export const Person = PersonModel(sequelize, Sequelize);

User.hasMany(Reservation);
Room.hasMany(Reservation);
Reservation.hasMany(ReservationPerson);
Person.hasMany(ReservationPerson);
export default db;
