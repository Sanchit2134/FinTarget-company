const TaskModel = require('../model/taskModel');
const { rateLimit } = require('../utils/rateLimit');
const fs = require('fs');
const path = require('path');

exports.handleTask = async (req, res) => {
  const { userId, task } = req.body;

  // Check rate limit
  if (!rateLimit(userId, task)) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }

  try {
    // Add task to the queue and process the next task
    await TaskModel.create({ userId, task });
    await processNextTask(userId);

    // Log task completion
    const logEntry = `${new Date().toISOString()} - User ${userId}: ${task}`;
    fs.appendFileSync(path.join(__dirname, '../', 'task_logs.txt'), logEntry + '\n');
    console.log(logEntry);

    res.status(200).json({ message: 'Task added to the queue' });
  } catch (err) {
    res.status(500).json({ error: 'Error processing task' });
  }
};

async function processNextTask(userId) {
  const nextTask = await TaskModel.findOneAndDelete({ userId }, { sort: { timestamp: 1 } });
  if (nextTask) {
    await processTask(userId, nextTask.task);
  }
}

async function processTask(userId, task) {
  // Task processing logic
}

exports.clearTaskQueue = async (req, res) => {
  const { userId } = req.body;
  try {
    await TaskModel.deleteMany({ userId });
    res.status(200).json({ message: 'Task queue cleared' });
  } catch (err) {
    res.status(500).json({ error: 'Error clearing task queue' });
  }
};