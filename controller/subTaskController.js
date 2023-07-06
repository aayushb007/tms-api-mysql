const SubTask = require('../models/SubTask');

// Create a new sub task
async function createSubTask(req, res) {
  try {
    const {
      taskType,
      parentTaskId,
      title,
      desc,
      status,
      assignedTo,
      startDate,
      dueDate,
      taskId
    } = req.body;

    const newSubTask = await SubTask.create({
      taskType,
      parentTaskId,
      title,
      desc,
      status,
      assignedTo,
      startDate,
      dueDate,
      TaskId: taskId
    });

    res.status(201).json(newSubTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create sub task' });
  }
}

// Get all sub tasks
async function getAllSubTasks(req, res) {
  try {
    const subTasks = await SubTask.findAll();
    res.json(subTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve sub tasks' });
  }
}

// Update a sub task
async function updateSubTask(req, res) {
  try {
    const subTaskId = req.params.id;
    const {
      taskType,
      parentTaskId,
      title,
      desc,
      status,
      assignedTo,
      startDate,
      dueDate,
    } = req.body;

    const subTask = await SubTask.findByPk(subTaskId);
    if (!subTask) {
      return res.status(404).json({ message: 'Sub task not found' });
    }

    await subTask.update({
      taskType,
      parentTaskId,
      title,
      desc,
      status,
      assignedTo,
      startDate,
      dueDate,
    });

    res.json(subTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update sub task' });
  }
}

// Delete a sub task
async function deleteSubTask(req, res) {
  try {
    const subTaskId = req.params.id;

    const subTask = await SubTask.findByPk(subTaskId);
    if (!subTask) {
      return res.status(404).json({ message: 'Sub task not found' });
    }

    await subTask.destroy();

    res.json({ message: 'Sub task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete sub task' });
  }
}

module.exports = {
  createSubTask,
  getAllSubTasks,
  updateSubTask,
  deleteSubTask,
};
