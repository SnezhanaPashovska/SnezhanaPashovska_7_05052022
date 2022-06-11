// database config

const dotenv = require('dotenv')
dotenv.config();

module.exports = {
  host: 'localhost',
  user: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  DB: 'grupomania',
  dialect: 'mysql',
  port: 3306
}

