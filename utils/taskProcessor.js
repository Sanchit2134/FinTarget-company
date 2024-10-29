const processTask = (userId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Task processed for user ${userId}`);
            resolve();
        }, 1000); // Simulate task processing time
    });
};

module.exports =  processTask ;
