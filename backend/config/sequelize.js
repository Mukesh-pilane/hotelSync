require('dotenv').config();
const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
console.log("Running Envirenment ", env);
const env_vars = require('./config')[env];

const sequelize = new Sequelize(
    env_vars.database, 
    env_vars.username, 
    env_vars.password, 
    {
      host: env_vars.host,
      port: env_vars.port,
      dialect: env_vars.dialect,
      logging: env_vars.logging,
      dialectOptions: {
        ssl: {
          require: true, 
          rejectUnauthorized: false, 
        }
      }
    }
  );
module.exports = sequelize;