const Sequelize = require("sequelize");

class Employee extends Sequelize.Model {
  constructor() {
    super();

  }

  static initModel(sequelize, DataTypes) {
    this.sequelize = sequelize;
    return this.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        full_name: {
          allowNull: false,
          type: DataTypes.STRING
        },
        site: {
          allowNull: false,
          type: DataTypes.STRING
        },
        username: {
          allowNull: false,
          type: DataTypes.STRING
        },
        password: {
          allowNull: false,
          type: DataTypes.STRING
        },
        mobile_number: {
          allowNull: false,
          type: DataTypes.STRING
        },
        email_address: {
          allowNull: false,
          type: DataTypes.STRING
        },
        user_type_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          references: {
            model: 'vms_user_types',
            key: 'id'
          }
        }
      },
      {
        tableName: "vms_employees",
        sequelize
      }
    );
  }

  _defineModel() {
    return this.sequelize.define('vms_employees', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      full_name: {
        type: Sequelize.STRING
      },
      site: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,

      },
      email_address: {
        type: Sequelize.STRING
      },
      mobile_number: {
        type: Sequelize.STRING
      },
      user_type_id: {
        type: Sequelize.INTEGER
      }
    })
  }

  _authenticateLogin(username, password) {
    return this._defineModel().findAll({ where: { username: username, password: password }, attributes: ['user_type_id'] });
  }

  _getOperators() {
    return this._defineModel().findAll({ where: { user_type_id: 1 }, attributes: ['id', 'full_name', 'site', 'username', 'mobile_number', 'email_address'] });
  }

  _addOperator(full_name, site, email_address, mobile_number, username, password) {
    return this._defineModel().create({
      full_name: full_name,
      site: site,
      email_address: email_address,
      mobile_number: mobile_number,
      username: username,
      password: password,
      user_type_id: 1
    })
  }

  _updateOperator(id, full_name, site, email_address, mobile_number, username){
    return this._defineModel().update({
      full_name: full_name,
      site: site,
      email_address: email_address,
      mobile_number: mobile_number,
      username: username
    },{
      where : {id: id}
    })
  }

  _changePass(id, password){
    return this._defineModel().update({
      password: password
    },{
      where : {id: id}
    })
  }

  static LOGIN = class {
    static AUTHENTICATELOGIN(username, password) {
      return new Employee()._authenticateLogin(username, password);
    }
  }

  static OPERATOR = class {
    static get OPERATORS() {
      return new Employee()._getOperators();
    }

    static ADDOPERATOR(full_name, site, email_address, mobile_number, username, password) {
      return new Employee()._addOperator(full_name, site, email_address, mobile_number, username, password);
    }

    static UPDATEOPERATOR(id, full_name, site, email_address, mobile_number, username) {
      return new Employee()._updateOperator(id, full_name, site, email_address, mobile_number, username);
    }

    static CHANGEPASS(id, password) {
      return new Employee()._changePass(id, password);
    }
  }

}
module.exports.Employee = Employee;