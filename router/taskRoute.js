const express = require('express');
const taskController = require('../controller/TaskController');

const router = express.Router();

router.post('/', taskController.handleTask);
router.delete('/clear', taskController.clearTaskQueue);

module.exports = router;