const User = require('../models/userModel');
const { validationResult } = require('express-validator');
const { generateToken , generateOTP } = require('../helpers');
const saltRounds = parseInt(process.env.saltRounds);
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require("nodemailer");
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Specify the destination directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique file name
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
});

exports.updateProfilePic = [
  upload.single('profile_pic'),
  async (req, res) => {
    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Handle profile picture upload
      if (req.file) {
        user.profile_pic = req.file.path; // Save the file path to the user's profile_pic field
      } else {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Save the updated user
      await user.save();

      res.status(200).json({ message: 'Profile picture updated successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
];

exports.changeUserStatus = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
      const { id } = req.params;
      const { block_user } = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(id, { block_user }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
   
      res.json(updatedUser);
    } catch (error) {
      res.status(400).send(error);
    }
  };



exports.getProfileDetails = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
        const user = await User.findById(req.user._id).select('name profile_pic age gender email username');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updatePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { old_password, new_password } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(old_password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid current password' });
    }

    const hashedPassword = await bcrypt.hash(new_password, saltRounds);

    user.password = hashedPassword;

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

  const { new_email } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.email == new_email) {
      return res.status(400).json({ message: 'You already used the same email' });
    }

    const existingUserWithEmail = await User.findOne({ email: new_email });
    if (existingUserWithEmail) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    user.email = new_email;

    const otp = generateOTP();
    const emailOTPCreatedAt = new Date();
    const emailOTPExpiresAt = new Date(emailOTPCreatedAt.getTime() + (24 * 60 * 60 * 1000)); // 24 hours expiry

    user.email_otp = otp;
    user.email_otp_dateCreated = emailOTPCreatedAt;
    user.email_otp_expiresAt = emailOTPExpiresAt;
    user.status = 'inactive';

    await user.save();

    // Send email with OTP
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
      to: new_email,
      subject: 'Your OTP for Email Update',
      text: `Hello,\n\nYour OTP for email update is: ${otp}`,
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


exports.updateProfile = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure the fields from the request body
  const { name, age, gender } = req.body;

  try {
    // Find the user by their ID
    const user = await User.findById(req.user._id);

    // If user is not found, return a 404 response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profile fields
    user.name = name;
    user.age = age;
    user.gender = gender;

    // Save the updated user profile
    await user.save();

    // Respond with a success message and the updated user object
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    // Log the error and return a 500 response
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};