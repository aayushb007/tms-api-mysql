const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,  
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  Task.belongsTo(User, { foreignKey: 'user_id' });
  module.exports = Task;