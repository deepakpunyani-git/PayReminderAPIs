const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { generateToken } = require('../helpers');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();
const saltRounds = parseInt(process.env.saltRounds);
const nodemailer = require("nodemailer");


exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate OTP
    const otp = generateOTP();
    const emailOTPCreatedAt = new Date();
    const emailOTPExpiresAt = new Date(emailOTPCreatedAt.getTime() + (24 * 60 * 60 * 1000)); // 24 hours expiry

    user = new User({ name, email, password: hashedPassword, email_otp: otp, email_otp_dateCreated: emailOTPCreatedAt, email_otp_expiresAt: emailOTPExpiresAt,status:'inactive' });
    await user.save();

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for User Registration',
      text: `Hello ${name},\n\nWelcome to our platform! You have successfully registered.\n\nYour OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { usernameOrEmail, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.status !== 'active') {
      return res.status(401).json({ message: 'Your account is not active' });
    }

    const token = generateToken(user);

    res.json({ token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
   

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found with this email' });
    }
    const otp = generateOTP();
    user.email_otp = otp;
    const emailOTPCreatedAt = new Date();
    user.email_otp_dateCreated = emailOTPCreatedAt;
    user.email_otp_expiresAt = new Date(emailOTPCreatedAt.getTime() + (24 * 60 * 60 * 1000)); 
    await user.save();

      const mailOptions = {
          to: email,
          from: 'Deepak <' + process.env.EMAIL_HOST + '>',
          subject: 'OTP Email',
          text: `Your OTP for email verification is: ${otp}`,
          html: `<p>Your OTP for email verification is: <strong>${otp}</strong></p>`,
      };

        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT, 
          secure: false,
          debug: true, 
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD 
          }
        });

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.error('Error sending email:', error);
              res.status(500).json({ message: 'Error sending email' });
          } else {
              console.log('Email sent:', info.response);
              res.status(200).json({ message: 'OTP sent successfully' });
          }
        });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.resetPassword =  async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || user.email_otp != otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (user.email_otp_expiresAt < Date.now()) {
      return res.status(400).json({ message: ' expired OTP' });
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      user.password = hashedPassword;
      user.email_otp = undefined;
      user.email_otp_expiresAt = undefined;
      user.email_otp_dateCreated = undefined;
      user.status = "active";

    await user.save();

    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract updated profile data from request body
  const { name, age, gender, image } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name;
    user.age = age;
    user.gender = gender;
    // Update image if needed

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.updatePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract current password and new password from request body
  const { currentPassword, newPassword } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid current password' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password
    user.password = hashedPassword;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateEmail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract new email from request body
  const { newEmail } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's email
    user.email = newEmail;

    // Generate and set email_otp
    user.email_otp = generateOTP();
    // Set email_otp_dateCreated to current date
    user.email_otp_dateCreated = new Date();

    // Save the updated user
    await user.save();

    // Send email with OTP
    const transporter = nodemailer.createTransport({
      // Set nodemailer transporter options
    });

    const mailOptions = {
      // Set email options (to, from, subject, text/html, etc.)
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        return res.status(200).json({ message: 'Email sent successfully' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    // Find the user by ID (available in the request object after authentication)
    const user = await User.findById(req._Id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user's profile details
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.email_otp != otp ) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (user.email_otp_expiresAt < Date.now()) {
      return res.status(400).json({ message: ' expired OTP' });
    }

    user.email_otp = undefined;
    user.email_otp_expiresAt = undefined;
    user.email_otp_dateCreated = undefined;
    user.status = "active";

    await user.save();

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
