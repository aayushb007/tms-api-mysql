const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db')
const app = express();
const { verifyToken , authenticateToken } = require('./auth/auth');
// const usersRoutes = require('./routes/users');
// const tasksRoutes = require('./routes/tasks');
app.use(cors());

// parse requests of content-type - application/json

app.use(bodyParser.json());
const FeatureController = require('./controller/featureController');
const UserController = require('./controller/userController');
const taskController = require('./controller/taskController');
const dependentTaskController = require('./controller/dependentTaskController');
const subTaskController = require('./controller/subTaskController');
app.use(express.json());

// Feature routes
app.post('/features', FeatureController.createFeature);
app.get('/features', FeatureController.getAllFeatures);
app.get('/features/bug/sub',FeatureController.getAllFeatureSubtaskBug);
app.delete('/features/:id', FeatureController.deleteFeature);
app.get('/features/user/:id', FeatureController.getAllFeatureUser);

// User routes
app.post('/users/register', UserController.createUser);
// parse requests of content-type - application/x-www-form-urlencoded
app.post('/users/login', UserController.login);
app.get('/users', UserController.getAllUsers);

// Create a new task
app.post('/tasks', taskController.createTask);


// Get all 

app.get('/tasks',authenticateToken, taskController.getAllTasks); //securing get task API
app.get('/tasks/bug/', taskController.getBugs);
app.get('/tasks/search/', taskController.searchTasks);
app.get('/tasks/:id', taskController.getAllTasksById);

app.get('/tasks/user', taskController.getAllTasksUser);

app.get('/tasks/user/:id', taskController.getTasksOfUser);
// Update a task
app.put('/tasks/:id', taskController.updateTask);

app.get('/tasks/bug/:id', taskController.getAllBugsByUser);


// Delete a task
app.delete('/tasks/:id', taskController.deleteTask);

// Create a new dependent task
app.post('/dependent-tasks', dependentTaskController.createDependentTask);

// Get all dependent tasks
app.get('/dependent-tasks', dependentTaskController.getAllDependentTasks);

// Update a dependent task
app.put('/dependent-tasks/:id', dependentTaskController.updateDependentTask);

// Delete a dependent task
app.delete('/dependent-tasks/:id', dependentTaskController.deleteDependentTask);

// Create a new sub task
app.post('/sub-tasks', subTaskController.createSubTask);

// Get all sub tasks
app.get('/sub-tasks', subTaskController.getAllSubTasks);

// Update a sub task
app.put('/sub-tasks/:id', subTaskController.updateSubTask);

// Delete a sub task
app.delete('/sub-tasks/:id', subTaskController.deleteSubTask);
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for validating JWT token
app.use((req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      const decodedToken = verifyToken(token, 'my-key');
      if (decodedToken) {
        req.userId = decodedToken.id;
      }
    }
    next();
  });
//simple route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Tms API' });
});
app.get('/test', async (req, res) => {
    try {
      await sequelize.authenticate();
      res.send('Database connection successful!');
    } catch (error) {
      res.status(500).send('Unable to connect to the database.');
    }
  });

// Sync the models and create tables
sequelize.sync({force:false})
.then(() => {
  console.log('Database synchronized');
  // Start the server
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
})
.catch((error) => {
  console.error('Unable to synchronize the database:', error);
});