const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./router/taskRoute');
const clusterSetup = require('./utils/clusterSetup');
const dotenv = require("dotenv");
const req = require('express/lib/request');
const connectDB = require('./configb/db')

dotenv.config();

// Set up Express app
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 9000;

// Connect to MongoDB
connectDB()

// Mount task routes
app.use('api/v1/tasks', taskRoutes);

// Start the server
clusterSetup(app);
