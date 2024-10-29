const fs = require('fs');
const path = require('path');

// Define the log file path
const logFilePath = path.join(__dirname, 'taskLogs.txt');

const logTaskCompletion = (userId,task) => {
    const timestamp = new Date().toISOString();
    const logEntry = `Task completed by user ${userId} at ${timestamp}\n`;

    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Error logging task completion:', err);
        }
    });
};

module.exports =  logTaskCompletion ;
