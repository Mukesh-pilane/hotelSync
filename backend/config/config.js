require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.PG_USERNAME,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE,
    "host": process.env.PG_HOST,
    "port": process.env.PG_PORT,
    "dialect": process.env.PG_DIALECT,
    "logging": false,
    "cors_frontend_origib" : process.env.FRONTEND_URL
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.PG_USERNAME,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE,
    "host": process.env.PG_HOST,
    "port": process.env.PG_PORT,
    "dialect": process.env.PG_DIALECT,
    "logging": false,
    "cors_frontend_origib" : process.env.FRONTEND_URL
  }
}
