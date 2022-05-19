const dotenv = require('dotenv')
dotenv.config();

module.exports = {
  host: 'localhost',
  user: process.env.user,
  password: process.env.password,
  DB: 'grupomania',
  dialect: 'mysql',
  port: 3306
}