const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db')
const app = express();
const { verifyToken } = require('./auth/auth');
const usersRoutes = require('./routes/users');
const tasksRoutes = require('./routes/tasks');
app.use(cors());

// parse requests of content-type - application/json

app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for validating JWT token
app.use((req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      const decodedToken = verifyToken(token, 'your-secret-key');
      if (decodedToken) {
        req.userId = decodedToken.id;
      }
    }
    next();
  });
// Middleware for validating JWT token
app.use((req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      const decodedToken = verifyToken(token, 'your-secret-key');
      if (decodedToken) {
        req.userId = decodedToken.id;
      }
    }
    next();
  });

// Use routes
app.use('/user', usersRoutes);
app.use('/task', tasksRoutes);
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
sequelize.sync()
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
// set port, listen for requests
// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });