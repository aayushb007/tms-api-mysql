const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have already established a Sequelize connection
const Task = require('./Task');
const SubTask = require('./SubTask');
const DependentTask = require('./DependentTask');
const User = require('./User');
class Feature extends Model{}
Feature.init({
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    // type: DataTypes.ENUM('Pending', 'Inprogress', 'Testing', 'Completed'),
    type: DataTypes.STRING(100),
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
//   UserId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'User',
//       key: 'id',
//     }
// }
}
,{
    sequelize,
    modelName: 'Feature',
});


Feature.belongsToMany(User,{through:"FeatureUser", as:"users", foreignKey:"user_id"});
User.belongsToMany(Feature,{through:"FeatureUser", as:"features", foreignKey:"feature_id"});

Feature.hasMany(Task,{as :"tasks"});
Task.belongsTo(Feature,{foreignKey:"feature_id",as :"feature"})

Task.hasMany(SubTask,{as :"subtasks"});
SubTask.belongsTo(Task,{foreignKey:"task_id",as :"task"})

Task.hasMany(DependentTask,{as :"dependentasks"});
DependentTask.belongsTo(Task,{foreignKey:"task_id",as :"task"})


User.belongsToMany(Task, { through: 'UserTask' });
Task.belongsToMany(User, { through: 'UserTask' });

module.exports = Feature;
