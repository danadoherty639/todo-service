const pool = require('../../db.js');

class  TaskModel {

    static getTask = (taskId) => {
        const sqlQuery = `SELECT * FROM tasks WHERE id = $1`;
        return new Promise((resolve, reject) => {
            pool.query(sqlQuery, [taskId], (error, result) => {
                console.log(result);
                if(result.rows.length === 0) {
                    console.log(`getTask ${taskId}`, error);
                    reject(new Error('Invalid request'));
                };
                resolve(result.rows[0]);
            });
        });
    };

    static addTask = async (name, description) => {
        const sqlQuery = `
            INSERT INTO tasks (name, description, done) 
            VALUES($1, $2, $3) 
            RETURNING id, name, description
        `;
        return new Promise((resolve, reject) => {
            pool.query(sqlQuery, [name, description, false], (error, results) => {
                if (error) {
                    console.log('ERROR', error);
                    reject(new Error(error));
                };
                console.log('TASK', results);
                resolve(results.rows[0]);
                
            });
        });
    };

    static getTasks = async () => {
        const sqlQuery = 'SELECT * FROM tasks';
        return new Promise((resolve, reject) => {
            pool.query(sqlQuery, [], (error, results) => {
                 if (error) {
                    console.log('ERROR', error);
                    reject(new Error(error));
                };
                resolve(results.rows);
            });
        });
    };

    static updateTask = async (name, description, taskId) => {
        const sqlQuery = `
            UPDATE tasks 
            SET name = $1, description = $2
            WHERE id = $3
            RETURNING name, description 
        `;
        return new Promise((resolve, reject) => {
            pool.query(sqlQuery, [name, description, taskId], (error, result) => {
                console.log('RESULT', result);
                if(result) {
                    console.log(`updateTask ${taskId}`, error);
                    reject(new Error('Invalid request'));
                };
                resolve(result);
            });
        });
    };

    static deleteTask = async (task) => {
        console.log('TASK:', task)
        const sqlQuery = 'DELETE FROM tasks WHERE id = $1';
        return new Promise((resolve, reject) => {
            pool.query(sqlQuery, [task], (error, result) => {
                console.log('RESULT', result);
                if(result.rows.length === 0) {
                    console.log(`deleteTask ${task}`, error);
                    reject(new Error('Invalid request'));
                };
                // const data  = {
                //     task: Array.isArray(result.rows) && result.rows.length > 0
                //         ? result.rows[0].tasks
                //         : false,
                // };
                resolve(result.rows[0]);
            });
        });
    };
    
};
module.exports = TaskModel;