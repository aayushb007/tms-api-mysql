const DependentTask = require('../models/DependentTask');
const Task = require('../models/Task')
// Create a new dependent task
async function createDependentTask(req, res) {
  try {
    const {
      taskType,
      dependentTaskId,
      title,
      desc,
      status,
      assignedTo,
      startDate,
      dueDate,
    } = req.body;

    const newDependentTask = await DependentTask.create({
      taskType,
      dependentTaskId,
      title,
      desc,
      status,
      assignedTo,
      startDate,
      dueDate
    });
    // const task = await Task.findByPk(dependentTaskId);
    // if(task){
      // await deleteDependentTask.addTask(task);
      res.status(201).json(newDependentTask);
    // }
    // else{
      // res.statuse(201).json('not found');
    // }
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create dependent task' });
  }
}

// Get all dependent tasks
async function getAllDependentTasks(req, res) {
  try {
    const dependentTasks = await DependentTask.findAll();
    res.json(dependentTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve dependent tasks' });
  }
}

// Update a dependent task
async function updateDependentTask(req, res) {
  try {
    let depTaskId = req.params.id;
    const {
      taskType,
      dependentTaskId,
      title,
      desc,
      status,
      assignedTo,
      startDate,
      dueDate,
    } = req.body;

    const dependentTask = await DependentTask.findByPk(depTaskId);
    if (!dependentTask) {
      return res.status(404).json({ message: 'Dependent task not found' });
    }

    await dependentTask.update({
      taskType,
      dependentTaskId,
      title,
      desc,
      status,
      assignedTo,
      startDate,
      dueDate,
    });

    res.json(dependentTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update dependent task' });
  }
}

// Delete a dependent task
async function deleteDependentTask(req, res) {
  try {
    const dependentTaskId = req.params.id;

    const dependentTask = await DependentTask.findByPk(dependentTaskId);
    if (!dependentTask) {
      return res.status(404).json({ message: 'Dependent task not found' });
    }

    await dependentTask.destroy();

    res.json({ message: 'Dependent task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete dependent task' });
  }
}

module.exports = {
  createDependentTask,
  getAllDependentTasks,
  updateDependentTask,
  deleteDependentTask,
};
