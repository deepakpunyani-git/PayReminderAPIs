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


const regUserData = () => {
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

  const plan = {
    total_email: 50,
    total_sms: 50,
    total_customers_in_company: 100,
    total_companies: 1,
    trial_taken: true,
    plan_type: 'Free',
    plan_status: 'Active',
    trialStartDate: new Date(),
    trialEndDate: oneMonthFromNow
  };
  return plan;
};


module.exports = { generateToken ,  generateOTP , regUserData};