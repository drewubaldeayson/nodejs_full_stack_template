const Sequelize = require("sequelize");

class Host extends Sequelize.Model {
  constructor() {
    super();
  }

  static initModel(sequelize, DataTypes) {
    this.sequelize = sequelize;
    return super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        full_name: DataTypes.STRING,
        department: DataTypes.STRING,
        mobile_number: DataTypes.STRING,
        email_address: DataTypes.STRING
      },
      {
        tableName: "vms_hosts",
        sequelize
      }
    );
  }

  _defineModel() {
    return this.sequelize.define('vms_hosts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      full_name: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      email_address: {
        type: Sequelize.STRING
      },
      mobile_number: {
        type: Sequelize.STRING
      }
    })
  }

  _getHosts() {
    return this._defineModel().findAll();
  }

  _addHost(full_name, department, email_address, mobile_number){
    return this._defineModel().create({
      full_name: full_name,
      department: department,
      email_address: email_address,
      mobile_number: mobile_number
    })
  }

  _updateHost(id, full_name, department, email_address, mobile_number){
    return this._defineModel().update({
      full_name: full_name,
      department: department,
      email_address: email_address,
      mobile_number: mobile_number
    },{
      where : {id: id}
    })
  }

  static HOST = class {

    static get ALLHOSTS() {
      return new Host()._getHosts();
    }

    static ADDHOST(full_name, department, email_address, mobile_number) {
      return new Host()._addHost(full_name, department, email_address, mobile_number);
    }

    static UPDATEHOST(id, full_name, department, email_address, mobile_number) {
      return new Host()._updateHost(id, full_name, department, email_address, mobile_number);
    }

  }

}
module.exports.Host = Host;
