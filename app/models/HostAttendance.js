const Sequelize = require("sequelize");
const Host = require("./Host");

class HostAttendance extends Sequelize.Model {
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
        time_in: DataTypes.DATE,
        time_out: DataTypes.DATE,
        host_id: {
          type: DataTypes.INTEGER,
          references: {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            model: 'vms_hosts',
            key: 'id'
          }
        }
      },
      {
        tableName: "vms_hosts_attendance",
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
      time_in: {
        type: Sequelize.DATE
      },
      time_out: {
        type: Sequelize.DATE
      },
      host_id: {
        type: Sequelize.INTEGER,
        references: {
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          model: 'vms_hosts',
          key: 'id'
        }
      }
    })
  }

  _getHostsAttendance() {
    let customQuery = `SELECT vh.id, vh.full_name,vh.department,vh.email_address,vh.mobile_number,IF(DATE_FORMAT(time_in, '%Y-%m-%d') >= date_format(now(),'%Y-%m-%d'),'YES','NO') as on_site FROM vms_hosts_attendance vha RIGHT JOIN vms_hosts vh ON vh.id=vha.host_id GROUP BY vh.id`;

    return this.sequelize.query(customQuery, { type: Sequelize.QueryTypes.SELECT }).then(function (records) {
      return records;
    })
  }

  static HOSTATTENDANCE = class{
    static get HOSTSATTENDANCE() {
      return new HostAttendance()._getHostsAttendance();
    }
  }
}
module.exports.HostAttendance = HostAttendance;
