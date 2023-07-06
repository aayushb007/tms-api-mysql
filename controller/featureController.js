const Feature = require('../models/Feature');
const User = require('../models/User');
const Task = require('../models/Task');
const SubTask = require('../models/SubTask')
// Create a feature
const createFeature = async (req, res) => {
  try {
    const { title, description,status, startDate, dueDate, assignedUserId } = req.body;

    const feature = await Feature.create({
      title,
      description,
      status,
      startDate,
      dueDate,
      // UserId: assignedUserId
    });
    console.log(assignedUserId);
    for (use of assignedUserId) {
      console.log(use);
      const user = await User.findByPk(use);

      await feature.addUser(user);
    }
    // const user = await User.findByPk(assignedUserId);

    // await feature.addUser(user);
    return res.status(201).json(feature);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all features with assigned users
const getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.findAll({
        include:[{
        model: User,
        as :"users"},{
          model : Task,
          as : "tasks"
        }]
      });
    return res.json(features);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
const getAllFeaturesBug = async (req, res) => {
  try {
    const features = await Feature.findAll({
        include:[{
        model: User,
        as :"users"},{
          model : Task,
          where :{ taskType : 'Bug'},
          as : "tasks"
        }]
      });
    return res.json(features);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
const getAllFeatureSubtaskBug = async(req,res)=>{
  try {

    const features = await Feature.findAll({
      include:[{
      model: User,
      as :"users"},{
        model : Task,
        where :{ taskType : 'Bug'},
        as : "tasks",
        include:[{
          model : SubTask,
          as:"subtasks"
      }]
      }]
    });
  return res.json(features);
  } catch (error) {
    return res.status(500).json({ error: error });
    
  }
}

const searchFeature = async(req,res)=>{
  
}
const getAllFeatureUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const features = await Feature.findAll({
        include:[{
        model: User,
        where: { id: userId }, 
        attributes: ['id', 'name', 'email'],
        as :"users"},{
          model : Task,
          as : "tasks"
        }]
      });
    return res.json(features);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteFeature = async (req, res) => {
  try {
    const Id = req.params.id;
    const feature = await Feature.findByPk(Id);
      if (!feature) {
        return res.status(404).json({ message: 'Feature not found' });
      }
      await feature.destroy();
      res.json({ message: 'Feature deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createFeature,
  getAllFeatures,
  getAllFeatureUser,
  deleteFeature,
  getAllFeatureSubtaskBug
};
