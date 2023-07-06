const User = require('../models/User');
const { generateToken, hashPassword, comparePassword ,verifyToken } = require('../auth/auth');
const jwt = require('jsonwebtoken');
// Create a user
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword });
     // Generate a JWT token
     const token = generateToken({ id: user.id }, 'my-key', '2h');

     res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const login =  async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = generateToken({ id: user.id }, 'my-key', '2h');

    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.name = name;
    user.email = email;
    user.password = password;
    await user.save();

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createUser,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
