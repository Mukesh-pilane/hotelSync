
const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const env_vars = require('./config')[env];

const sequelize = new Sequelize(
    env_vars.database, 
    env_vars.username, 
    env_vars.password, {
    host: env_vars.host,
    port:env_vars.port,
    dialect: env_vars.dialect,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false  // Ensure this is set to `false` if you're connecting over SSL
        }
    },
    logging: env_vars.logging
});
module.exports = sequelize;