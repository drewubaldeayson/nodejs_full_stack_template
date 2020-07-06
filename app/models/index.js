'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var CONSTANTS = require('../../constants/constants').CONSTANTS;
var env = CONSTANTS.ENV_TYPE.DEVELOPMENT;
var config = require('../../config/config')[env];

var UserTypeModel = require("../models/UserType").UserType;
var EmployeeModel = require("../models/Employee").Employee;
var HostModel = require("../models/Host").Host;
var VisitorModel = require("../models/Visitor").Visitor;
var VisitorTransactionModel = require("../models/VisitorsTransactions").VisitorTransaction;
var HostAttendanceModel = require("../models/HostAttendance").HostAttendance;

var basename = path.basename(__filename);

var db = {};

var sequelize = new Sequelize(config.database, config.username, config.password, config);

const models = {
    UserType: UserTypeModel.initModel(sequelize, Sequelize),
    Employee: EmployeeModel.initModel(sequelize, Sequelize),
    Host: HostModel.initModel(sequelize, Sequelize),
    Visitor: VisitorModel.initModel(sequelize, Sequelize),
    VisitorTransaction: VisitorTransactionModel.initModel(sequelize, Sequelize),
    HostAttendance: HostAttendanceModel.initModel(sequelize, Sequelize)
};

Object.values(models)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(models));

db = {
    ...models,
    sequelize
};

module.exports = db;
