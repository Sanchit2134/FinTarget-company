const dotenv = require("dotenv");
const mongoose = require('mongoose')
dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Optionally exit if connection fails
    }
};


module.exports = connectDB;