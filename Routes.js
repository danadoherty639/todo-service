const router = require('express').Router();

const TaskContontroller = require('./api/controllers/TaskController');

router.get('/tasks', TaskContontroller.getTasks);
router.get('/task/:id', TaskContontroller.getTask);
router.post('/task', TaskContontroller.addTask);
router.put('/task/:id', TaskContontroller.updateTask);
router.post('/task/:id', TaskContontroller.deleteTask);

module.exports = router