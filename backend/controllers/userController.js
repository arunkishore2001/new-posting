const User = require('../models/User');

// Controller for handling user sign-up
const signUpUser = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(400).send('Error creating user');
    }
};

module.exports = { signUpUser };
