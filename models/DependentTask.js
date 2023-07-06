const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class DependentTask extends Model {}

DependentTask.init(
  {
    taskType: {
      type: DataTypes.ENUM('Task', 'Bug'),
      allowNull: false,
    },
    dependentTaskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Inprogress', 'Testing', 'Completed'),
      allowNull: false,
    },
    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'DependentTask',
  }
);

module.exports = DependentTask;
