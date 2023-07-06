const { DataTypes , Model } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Feature = require('./Feature');
class Task extends Model {}
Task.init({
  taskType: {
    type: DataTypes.ENUM('Task', 'Bug'),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Inprogress', 'Testing', 'Completed'),
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
},{
  sequelize,
    modelName: 'Task'
});

// Task.belongsTo(Feature);
// Task.belongsToMany(User, { through: 'TaskUser' });


module.exports = Task;