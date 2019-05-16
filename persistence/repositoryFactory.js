const Sequelize = require('sequelize');
const dbConfig = require('../config/custom-db-config')();

function createDBConnectionRepository() {    
    console.log(dbConfig.database);
    
    return new Sequelize({
        host: dbConfig.host,
        database: dbConfig.database,
        username: dbConfig.username,
        password: dbConfig.password,
        port: dbConfig.port,
        dialect: dbConfig.driver,

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        operatorsAliases: false
    });
}

module.exports = function () {
    return createDBConnectionRepository;
}