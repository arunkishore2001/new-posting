
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    companyName: String,
    companyEmail: String,
    employeeSize: Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;
