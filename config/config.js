let CONSTANTS = require('../constants/constants').CONSTANTS;
module.exports = {
  development: {
    username: CONSTANTS.DB_PARAMS.DB_USER,
    password: CONSTANTS.DB_PARAMS.DB_PASSWORD,
    database: CONSTANTS.DB_PARAMS.DB_SCHEMA,
    host: CONSTANTS.DB_PARAMS.DB_HOST,
    dialect: 'mysql',
    define: {
      timestamps: false
    }
  },
  test: {
    username: CONSTANTS.DB_PARAMS.DB_USER,
    password: CONSTANTS.DB_PARAMS.DB_PASSWORD,
    database: CONSTANTS.DB_PARAMS.DB_SCHEMA,
    host: CONSTANTS.DB_PARAMS.DB_HOST,
    dialect: 'mysql',
    define: {
      timestamps: false
    }
  },
  production: {
    username: CONSTANTS.DB_PARAMS.DB_USER,
    password: CONSTANTS.DB_PARAMS.DB_PASSWORD,
    database: CONSTANTS.DB_PARAMS.DB_SCHEMA,
    host: CONSTANTS.DB_PARAMS.DB_HOST,
    dialect: 'mysql',
    define: {
      timestamps: false
    }
  }
};
