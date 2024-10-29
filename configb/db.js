const dotenv = require("dotenv");
const mongoose = require('mongoose')
dotenv.config()

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('MongoDB connected successfully');
        })
        .catch((error) => {
            console.error('MongoDB connection error:', error);
        });
}

module.exports = connectDB;