const processTask = (userId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Task processed for user ${userId}`);
            resolve();
        }, 1000); 
    });
};

module.exports =  processTask ;
