const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (payload, secretKey, expiresIn) => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

const verifyToken = (token, secretKey) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decodedToken = jwt.verify(token, 'my-key');
    req.userId = decodedToken.id;

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { generateToken, verifyToken, hashPassword, comparePassword, authenticateToken };
