const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const User = require('../models/user');
const { authenticateToken } = require('../auth/auth');
// Create a new task
router.post('/',authenticateToken, async (req, res) => {
    try {
        const { title, desc, user_id, due_date, status } = req.body;
    
        // Check if the user exists
        const user = await User.findByPk(user_id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Create the task with the associated user_id
        const task = await Task.create({
          title,
          desc,
          user_id,
          due_date,
          status,
        });
    
        res.status(201).json(task);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
});

// Get all tasks
router.get('/',authenticateToken,async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single task
router.get('/:id',authenticateToken, async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a tasks of user
router.get('/user/:id',authenticateToken, async (req, res) => {
    try {
      const task = await Task.findAll( {where : { user_id : req.params.id}});
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
// Update a task
router.put('/:id',authenticateToken, async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.update(req.body);
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a task
router.delete('/:id',authenticateToken, async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.destroy();
      res.json({ message: 'Task deleted' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
