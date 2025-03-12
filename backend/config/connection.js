const { sequelize, Sequelize } = require('../models');
// const sequelize = require('../config/sequelize');

const sequelizeConnectionType = process.env.sequelizeConnectionType || 'sync';

const syncOptions = {
  alter: sequelizeConnectionType === 'sync',
  force: false
};

function DatabaseConnect() {
  sequelize.sync(syncOptions).then(() => {
    console.log('Database Connected');
  }).catch((err) => {
    console.log(`Error While Connecting Database\n${err}\nRetry Database Connection after 5000ms\n`);
    setTimeout(() => {
      DatabaseConnect();
    }, 5000);
  });
}

DatabaseConnect();
