/* // require('dotenv').config();

const jwt = require('jsonwebtoken');
const { Users } = require('../../models');

const segredo = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  try {
    const decoded = jwt.verify(token, segredo, jwtConfig);
    const user = await Users.findOne({ where: { displayName: decoded.displayName } });
    if (!user) {
      return res.status(401)
        .json({ message: 'Invalid login or password' });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
}; */