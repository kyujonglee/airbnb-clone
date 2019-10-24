import dotenv from 'dotenv';
dotenv.config();

module.exports = {
  development: {
    username: 'airbnb',
    password: 'airbnb',
    database: 'membership_airbnb',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: 'no-op',
    charset: 'utf8',
    collate: 'utf8_general_ci'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false
  },
  production: {
    username: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    database: 'membership_airbnb',
    host: process.env.DB_PORT,
    dialect: 'mysql',
    operatorsAliases: 'no-op',
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }
};
