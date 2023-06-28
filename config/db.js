const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tms', 'root', 'aayush@123', {
  dialect: 'mysql', // or 'postgres' for PostgreSQL
});

module.exports = sequelize;