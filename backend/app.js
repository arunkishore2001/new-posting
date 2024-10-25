// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const otpRoutes = require('./routes/otp');
const interviewRoutes = require('./routes/interviewRoutes');

// Load environment variables from config.env
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const app = express();
const PORT = process.env.PORT; 


app.use(cors());


app.use(bodyParser.json());

// // Set up session management
// app.use(session({
//     secret: process.env.SESSION_SECRET || 'your-default-secret-key',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: process.env.NODE_ENV === 'production' } // Secure cookies in production
// }));

// Connect to MongoDB
const CONNECTION_URL = process.env.MONGODB_URI;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error.message));



app.use('/api', userRoutes);
app.use('/api', otpRoutes);
app.use(interviewRoutes)


app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT} in ${process.env.NODE_ENV} mode`);
});
