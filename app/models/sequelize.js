const mysql = require('mysql2');
var CONSTANTS = require("./../../constants/constants").CONSTANTS.DB_PARAMS;
const Sequelize = require('sequelize');

class SEQUELIZE {
    constructor() { }
    
    initSeq() {
        return new Sequelize(CONSTANTS.DB_SCHEMA, CONSTANTS.DB_USER, CONSTANTS.DB_PASSWORD, {
            host: CONSTANTS.DB_HOST,
            dialect: 'mysql',
            define: {
                timestamps: false
            }
        });
    }

    testConn() {
        this.initSeq()
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    }
}
module.exports.SEQUELIZE = SEQUELIZE;

