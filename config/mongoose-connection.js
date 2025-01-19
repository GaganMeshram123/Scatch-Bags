const mongoose = require('mongoose');

const mongoConnect = async (url) => {
    try {
        await mongoose.connect(url, {
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process if there's a connection error
    }
};

module.exports = mongoConnect;
