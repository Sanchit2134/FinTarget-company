const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./router/taskRoute');
const clusterSetup = require('./utils/clusterSetup');
const dotenv = require("dotenv");
const req = require('express/lib/request');
const connectDB = require('./configb/db')
const queueTask = require('./utils/taskQueue');
const processTask = require('./utils/taskProcessor');
const { rateLimit } = require('./utils/rateLimit');
const taskController = require('./controller/TaskController'); 

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 9000;

connectDB()

app.post('/api/v1/tasks', (req, res) => {
    const { userId, task } = req.body;

    if (!userId || !task) {
        return res.status(400).send({ error: 'userId and taskData are required' });
    }

    if (!rateLimit(userId, task)) {
        return res.status(429).send({ error: 'Rate limit exceeded' });
    }

    queueTask(userId, () => processTask(userId, task));
    res.status(200).send({ message: 'Task queued' });
});

app.delete('/api/v1/tasks/clear', (req, res) => {
    taskController.clearTaskQueue(req, res);
});

clusterSetup(app);
