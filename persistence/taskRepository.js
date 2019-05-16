const Sequelize = require('sequelize');
let TaskTable = {};

function TaskRepository(connection) {
    this._connection = connection;
    TaskTable = connection.define('task', {
        description: Sequelize.STRING
    });
}

TaskRepository.prototype.getById = function (taskId, callback) {
    this._connection.sync()
        .then(() => TaskTable.findAll({ where: { id: taskId } }))
        .then(callback);
}

TaskRepository.prototype.getAll = function (callback) {
    this._connection.sync()
        .then(() => TaskTable.findAll({
            order: [
                ['createdAt', 'DESC'],
            ]
        }))
        .then(callback);
}

TaskRepository.prototype.add = function (task, callback) {
    this._connection.sync()
        .then(() => TaskTable.create(task))
        .then(callback);
}

TaskRepository.prototype.update = function (task, callback) {
    this._connection.sync()
        .then(() => TaskTable.update({ description: task.description }, { where: { id: task.id } }))
        .then(callback);
}

TaskRepository.prototype.delete = function (taskId, callback) {
    this._connection.sync()
        .then(() => TaskTable.destroy({ where: { id: taskId } }))
        .then(callback);
}

module.exports = function () {
    return TaskRepository;
}