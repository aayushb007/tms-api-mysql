const Task = require('../models/Task');
const User = require('../models/User');
const Feature = require('../models/Feature');
const SubTask = require('../models/SubTask');
const { Op } = require('sequelize');
// Create a new task
async function createTask(req, res) {
    try {
      const { taskType, title, desc, status, startDate, dueDate, feature_id } = req.body;
      Feature.findByPk(feature_id,{
        include:[{
          model: User,
          as :"users"}]
      }).then(async (feature)=>{
       if(feature){
        const newTask = await Task.create({
          taskType,
          title,
          desc,
          status,
          startDate,
          dueDate,
          FeatureId: feature_id
        });
        newTask.setUsers(feature.users).then(()=>{
          console.log('Task Assigned Successfully');
        })
        res.status(201).json(newTask);
       }
       else {
        res.status(500).json({ message :"Feature Not Found"})
       }
      })
      // const newTask = await Task.create({
      //   taskType,
      //   title,
      //   desc,
      //   status,
      //   startDate,
      //   dueDate,
      //   FeatureId: feature_id
      // });
      // res.status(201).json(newTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create task' });
    }
  }
  
  // Get all tasks
  async function getAllTasks(req, res) {
    try {
      const tasks = await Task.findAll(
        { include: [
            {
              model: SubTask,
              as: 'subtasks',
              }, {
                model: User,
                attributes: ['id', 'name', 'email']
              }]});
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve tasks' });
    }
  }

  async function getAllTasksById(req, res) {
    try {
      const taskId = req.params.id;
   
  
      const task = await Task.findByPk(taskId,{include:["subtasks"]});
      res.json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve tasks' });
    }
  }
   
  async function getBugs(req,res){
    try {
      const tasks = await Task.findAll({ where :{ taskType :'Bug'},
         include: [
            {
              model: SubTask,
              as: 'subtasks',
              }, {
                model: User,
                attributes: ['id', 'name', 'email']
              }]});
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve tasks' });
    }
  }
   // Get all bugs
   async function getAllBugsByUser(req, res) {
    try {
      const userId = req.params.id;
      const tasks = await Task.findAll({ where :{ taskType :'Bug'},
      include: [
         {
           model: SubTask,
           as: 'subtasks',
           }, {
             model: User,
             where : {id : userId},
             attributes: ['id', 'name', 'email']
           }]});
       res.status(200).json(tasks);
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve tasks' });
    }
  }
  
  async function getAllTasksUser(req, res) {
    try {
      const tasks = await Task.findAll({ include: [
        {
          model: User,
          attributes: ['id', 'name', 'email'], // Fetch specific user attributes
        },
      ]});
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve tasks' });
    }
  }
  
  async function getTasksOfUser(req, res) {
    try {
      const userId = req.params.id;
      const tasks = await Task.findAll({ include: [
        {
          model: User,
          where : {id : userId},
          attributes: ['id', 'name', 'email'], // Fetch specific user attributes
        },
      ]});
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve tasks' });
    }
  }

  async function searchTasks(req, res) {
    try {
      const { query } = req.query;
  
      const tasks = await Task.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${query}%` } },
            { desc: { [Op.like]: `%${query}%` } },
           
          ],
        },
        include: [{ model: User,
          where : {name : { [Op.like]: `%${query}%` } }, }]
      });
  
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to search tasks' });
    }
  }
  
  // Update a task
  async function updateTask(req, res) {
    try {
      const taskId = req.params.id;
      const { taskType, title, desc, status, startDate, dueDate } = req.body;
  
      const task = await Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      await task.update({
        taskType,
        title,
        desc,
        status,
        startDate,
        dueDate
      });
  
      res.json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update task' });
    }
  }
  
  // Delete a task
  async function deleteTask(req, res) {
    try {
      const taskId = req.params.id;
      const task = await Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      await task.destroy();
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete task' });
    }
  }
  module.exports = {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
    getAllTasksUser,
    getTasksOfUser,
    getAllBugsByUser,
    getBugs,
    searchTasks,
    getAllTasksById
  };
    