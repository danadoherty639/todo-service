const taskModel = require('../models/TaskModel.js');

const TaskController = {

    async getTasks (req, res) {
        console.log('TaskController.getTasks')
        const tasks = await taskModel.getTasks().catch((error) => {
            res.status(500).json({ errror: error.code, message: 'Internal error'});
        });
        res.status(200).json({tasks});
    },

    async getTask (req, res) {
        const taskId = req.params.id;
        const task = await taskModel.getTask(taskId).catch((error) => {
            res.status(500).json({ errror: error.code, message: 'Internal server error'});
        });
        res.status(200).json({ task })
    },

    async addTask (req, res) {
        const { name, description } = req.body;
        const task = await taskModel.addTask(name, description).catch((error) => {
            res.status(500).json({ error: error.code, message: 'Internal server error'})
        });
        res.status(200).json({ task }); 
    },

    async updateTask (req, res) {
        const taskId =  req.params.id; 
        console.log('IN UPDATE', taskId);
        const { name, description } = req.body;
        const result = await taskModel.updateTask(name, description, taskId).catch((error) => {
            res.status(500).json({ error: error.code, message: 'Internal server error'});
        });
        console.log('RESUlT', result);
        return res.status(200).json({ updatedTask: result});
    },

    async deleteTask (req, res) {
        const taskId =  req.params.id; 
        const { name, description } = req.body;
        console.log('TASKID', taskId)
        const result = await taskModel.deleteTask(taskId).catch((error) => {
            res.status(500).json({ error: error.code, message: 'Internal server error'});
        });
        res.status(200).json({ updatedTask: result});
    },
};

module.exports = TaskController;