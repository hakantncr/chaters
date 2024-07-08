const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.DB_STRING);
    mongoose.connection.on('open', () => {
        console.log('Connected to DB');
    });
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB connection error:', err);
    });
    mongoose.Promise = global.Promise;
};