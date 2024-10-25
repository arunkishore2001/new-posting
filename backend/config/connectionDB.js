const mongoose = require('mongoose'); 

const connectionDB = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((con) => {
        console.log('MongoDB connected to host: ' + con.connection.host);
    })
    .catch((err) => {
        console.error(`Error: ${err.message}`);
        process.exit(1); 
    });
};


module.exports = connectionDB;
