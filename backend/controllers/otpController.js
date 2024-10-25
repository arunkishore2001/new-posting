const Otp = require('../models/Otp');
const User = require('../models/User');
const sendMail = require('../utils/sendMail');

// Generate and send OTP
exports.sendOtp = async (req, res) => {
    const { companyEmail } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ companyEmail });
        if (!user) {
            console.log(`User with email ${companyEmail} not found.`);
            return res.status(404).json({ message: 'User not found.' });
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString(); 

        const otpEntry = new Otp({ email: companyEmail, otp });
        await otpEntry.save(); 
        console.log(`OTP ${otp} saved for email: ${companyEmail}`);

        const subject = 'Your OTP Code';
        const text = `Your OTP code is ${otp}. It will expire in 5 minutes.`;

        await sendMail(companyEmail, subject, text);
        console.log(`Email sent to ${companyEmail} with OTP: ${otp}`);
        
        res.status(200).json({ message: 'OTP sent to your email!' });

    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Error sending OTP' });
    }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const otpEntry = await Otp.findOne({ email, otp });
        if (!otpEntry) {
            console.log(`Invalid OTP ${otp} for email: ${email}`);
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        await Otp.deleteMany({ email }); 
        console.log(`OTP ${otp} verified successfully for email: ${email}`);

        res.status(200).json({ message: 'OTP verified successfully!' });

    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
