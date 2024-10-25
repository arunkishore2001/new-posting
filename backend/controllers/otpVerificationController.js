const User = require('../models/User'); 
const OTP = require('../models/Otp'); 


exports.verifyEmailOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
  
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

   
        const otpRecord = await OTP.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(400).json({ verified: false });
        }

      
        await OTP.deleteOne({ email });
        return res.json({ verified: true });

    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
