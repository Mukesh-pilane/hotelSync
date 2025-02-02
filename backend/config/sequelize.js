
const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const env_vars = require('./config')[env];

const sequelize = new Sequelize(
    env_vars.database, 
    env_vars.username, 
    env_vars.password, {
    host: env_vars.host,
    dialect: env_vars.dialect,
    logging: env_vars.logging
});
module.exports = sequelize;