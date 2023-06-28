const { Sequelize } = require('sequelize');
//define 
const sequelize = new Sequelize('tms', 'root', 'aayush@123', {
  dialect: 'mysql', 
});

module.exports = sequelize;