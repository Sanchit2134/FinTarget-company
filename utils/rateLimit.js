const taskQueue = new Map();

const rateLimit = {
  perSecond: 1,
  perMinute: 20,
};

exports.rateLimit = (userId, task) => {
  const now = Date.now();
  const userTasks = taskQueue.get(userId) || [];
  const recentTasks = userTasks.filter((t) => t.timestamp > now - 60_000);
  const secondTasks = userTasks.filter((t) => t.timestamp > now - 1_000);

  if (secondTasks.length >= rateLimit.perSecond) {
    return false;
  }

  if (recentTasks.length >= rateLimit.perMinute) {
    return false;
  }

  taskQueue.set(userId, [
    ...userTasks,
    { task, timestamp: now },
  ]);

  return true;
};

exports.taskQueue = taskQueue;
