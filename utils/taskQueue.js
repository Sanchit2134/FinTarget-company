const rateLimit = require('./rateLimit');
const logTaskCompletion = require('./taskLogger');

// Map to store queues for each user
const userQueues = new Map();

const queueTask = (userId, task) => {
    if (!userQueues.has(userId)) {
        userQueues.set(userId, []);
    }

    const userQueue = userQueues.get(userId);
    userQueue.push(task);

    // Process the queue if it's the only task
    if (userQueue.length === 1) {
        processNextTask(userId);
    }
};

const processNextTask = async (userId) => {
    const userQueue = userQueues.get(userId);
    if (!userQueue || userQueue.length === 0) return;

    const task = userQueue[0];

    // Execute task and log its completion
    try {
        await task(); // Assume task is an async function
        logTaskCompletion(userId);
    } catch (error) {
        console.error(`Task failed for user ${userId}:`, error);
    }

    // Remove the processed task and move to the next
    userQueue.shift();
    if (userQueue.length > 0) {
        processNextTask(userId);
    } else {
        userQueues.delete(userId);
    }
};

module.exports =  queueTask ;
