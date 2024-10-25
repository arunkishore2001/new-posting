const User = require('../models/User');
const Otp = require('../models/Otp');
const crypto = require('crypto'); 


const generateOtp = async (userId) => {
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); 

  const otpData = new Otp({
    otp,
    otpExpires,
    user: userId,
  });

  await otpData.save(); // Save the OTP and expiry to the Otp schema
  return otp;
};

// Example of user signup route
const userSignup = async (req, res) => {
  const { name, phone, companyName, companyEmail, employeeSize } = req.body;

  try {
    // Create and save the user
    const newUser = new User({ name, phone, companyName, companyEmail, employeeSize });
    await newUser.save();

    // Generate OTP for the new user
    const otp = await generateOtp(newUser._id);
    console.log('OTP generated and saved:', otp);

    // Send OTP to user's email (implement your own email logic here)
    res.status(201).json({ message: 'User created successfully. OTP has been sent.' });
  } catch (error) {
    res.status(400).json({ error: 'Error creating user.' });
    console.error(error);
  }
};

module.exports = { userSignup };
