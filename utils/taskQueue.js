const rateLimit = require('./rateLimit');
const logTaskCompletion = require('./taskLogger');

const userQueues = new Map();

const queueTask = (userId, task) => {
    if (!userQueues.has(userId)) {
        userQueues.set(userId, []);
    }

    const userQueue = userQueues.get(userId);
    userQueue.push(task);

    if (userQueue.length === 1) {
        processNextTask(userId);
    }
};

const processNextTask = async (userId) => {
    const userQueue = userQueues.get(userId);
    if (!userQueue || userQueue.length === 0) return;

    const task = userQueue[0];

    try {
        await task(); 
        logTaskCompletion(userId);
    } catch (error) {
        console.error(`Task failed for user ${userId}:`, error);
    }

    userQueue.shift();
    if (userQueue.length > 0) {
        processNextTask(userId);
    } else {
        userQueues.delete(userId);
    }
};

module.exports =  queueTask ;
