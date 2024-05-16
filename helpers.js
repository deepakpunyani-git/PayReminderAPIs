const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const { JWT_SECRET } = process.env;

function generateToken(user) {
  const token = jwt.sign({ name: user.name, usertype:  user.usertype , _id:user._id }, JWT_SECRET, { expiresIn: '1d' });
  return token;

}


const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};


module.exports = { generateToken };