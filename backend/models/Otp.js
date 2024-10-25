
const Otp = require('../models/Otp'); 
const User = require('../models/User'); 


exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

      
        const otpEntry = await Otp.findOne({ email, otp });
        if (!otpEntry) {
            return res.status(400).json({ verified: false, message: 'Invalid OTP' });
        }

       
        await Otp.deleteOne({ email, otp });

        return res.json({ verified: true, message: 'OTP verified successfully!' });

    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
