const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    // res.sendStatus(401);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticateJWT;
