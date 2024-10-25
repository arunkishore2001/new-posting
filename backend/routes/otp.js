const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');

// Route for sending OTP
router.post('/send-otp', otpController.sendOtp);

// Route for verifying OTP
router.post('/verify-otp', otpController.verifyOtp);

module.exports = router;
