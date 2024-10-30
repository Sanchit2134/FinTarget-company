const TaskModel = require('../model/TaskModel');
const { rateLimit } = require('../utils/rateLimit');
const fs = require('fs');
const path = require('path');

exports.handleTask = async (req, res) => {
  try {
      const {userId,task} = req.body; 
      console.log(req.body)

      if (!userId || !task) {
          return res.status(400).json({ error: "User ID and task are required" });
      }

      if (!rateLimit(userId, task)) {
          return res.status(429).json({ error: "Rate limit exceeded" });
      }

      res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
      console.error("Error in handleTask:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};


async function processNextTask(userId) {
  const nextTask = await TaskModel.findOneAndDelete({ userId }, { sort: { timestamp: 1 } });
  if (nextTask) {
    await processTask(userId, nextTask.task);
  }
}


exports.clearTaskQueue = (req, res) => {
  try {
      
      const { taskQueue } = require('../utils/rateLimit');
      taskQueue.clear();
      res.status(200).json({ message: "Task queue cleared successfully" });
  } catch (error) {
      console.error("Error clearing task queue:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};