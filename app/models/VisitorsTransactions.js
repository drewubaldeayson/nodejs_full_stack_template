const Sequelize = require("sequelize");
const randomize = require('randomatic');

class VisitorTransaction extends Sequelize.Model {
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
        check_in: DataTypes.DATE,
        check_out: DataTypes.DATE,
        has_appointment: DataTypes.BOOLEAN,
        host_name: DataTypes.STRING,
        purpose_of_visit: DataTypes.STRING,
        verification_code: DataTypes.STRING,
        is_verified: DataTypes.TINYINT,
        visitor_id: {
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          type: DataTypes.INTEGER,
          references: {
            model: 'vms_visitors',
            key: 'id'
          }
        },
        host_id: {
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          type: DataTypes.INTEGER,
          references: {
            model: 'vms_hosts',
            key: 'id'
          }
        }
      },
      {
        tableName: "vms_visitors_transactions",
        sequelize
      }
    );
  }

  _defineModel() {
    return this.sequelize.define('vms_visitors_transactions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      check_in: {
        type: Sequelize.DATE
      },
      check_out: {
        type: Sequelize.DATE
      },
      has_appointment: {
        type: Sequelize.BOOLEAN
      },
      host_name: {
        type: Sequelize.STRING
      },
      purpose_of_visit: {
        type: Sequelize.STRING
      },
      verification_code: {
        type: Sequelize.STRING
      },
      is_verified: {
        type: Sequelize.TINYINT
      },
      visitor_id: {
        type: Sequelize.INTEGER,
      },
      host_id: {
        type: Sequelize.INTEGER,
      }
    })
  }

  _getOnQueueVisitors() {
    let customQuery = `SELECT vt.id as id, v.full_name as name, v.mobile_number as mobile_number, vt.purpose_of_visit as purpose,vt.verification_code,
    vt.host_name as host,v.email_address, DATE_FORMAT(vt.check_in, "%m/%d/%Y %h:%i:%s") as time_in, IF(vt.is_verified = 1, 'Verified',IF(vt.is_verified =0,'Pending',IF(vt.is_verified=2,'Rejected','Unknown'))) as status 
    FROM vms_visitors_transactions vt LEFT JOIN vms_visitors v ON v.id=vt.visitor_id`;

    return this.sequelize.query(customQuery, { type: Sequelize.QueryTypes.SELECT }).then(function (records) {
      return records
    })
  }

  _approveVisitor(id) {
    let verification_code = randomize('Aa0', 6);

    return this._defineModel().update({
      is_verified: 1,
      verification_code: verification_code
    }, {
        where: { id: id }
    });
  }

  _rejectVisitor(id) {
    return this._defineModel().update({
      is_verified: 2
    }, {
        where: { id: id }
      });
  }

  _getVerificationCode(id){
    return this._defineModel().findOne({
      where:{
        id:id
      }
    })
  }

  _verifyQrCode(verification_code, email_address) {
    let customQuery = `SELECT v.full_name FROM vms_visitors_transactions vt LEFT JOIN vms_visitors v ON v.id = vt.visitor_id where vt.verification_code = '${verification_code}' and v.email_address='${email_address}';`;

    return this.sequelize.query(customQuery, { type: Sequelize.QueryTypes.SELECT }).then(function (records) {
      return records
    })
  }

  _checkoutVisitor(verification_code) {
    return this._defineModel().update({
      check_out: this.sequelize.literal('CURRENT_TIMESTAMP')
    }, {
        where: { verification_code: verification_code }
      });
  }

  _verifyCode(verification_code) {
    let customQuery = `SELECT vt.*,v.full_name,v.mobile_number,v.company,v.email_address,v.full_name,v.visitor_image FROM vms_visitors_transactions vt LEFT JOIN vms_visitors v ON v.id = vt.visitor_id where vt.verification_code = '${verification_code}';`;

    return this.sequelize.query(customQuery, { type: Sequelize.QueryTypes.SELECT }).then(function (records) {
      return records
    })
  }

  _verifyVisitor(id) {
    return this._defineModel().update({
      check_in: this.sequelize.literal('CURRENT_TIMESTAMP'),
      is_verified: 1
    }, {
        where: { id: id }
      });
  }

  _getVisitorMonthlyCount(id, month) {
    let customQuery = `SELECT COUNT(vt.id) as monthly_count FROM vms.vms_visitors_transactions vt LEFT JOIN vms_visitors v ON v.id=vt.visitor_id WHERE DATE_FORMAT(vt.check_in, "%m") = ${month} and v.id= ${id}`;

    return this.sequelize.query(customQuery, { type: Sequelize.QueryTypes.SELECT }).then(function (records) {
      return records;
    })
  }

  _getVisitorVisits(id, month) {
    let customQuery = `SELECT vt.purpose_of_visit,vt.host_name,DATE_FORMAT(check_in, "%m %d, %y") as date_checked, DATE_FORMAT(vt.check_in, "%h:%i:%s") as check_in,DATE_FORMAT(vt.check_out, "%h:%i:%s") as check_out FROM vms.vms_visitors_transactions vt 
    LEFT JOIN vms_visitors v ON v.id=vt.visitor_id 
    WHERE DATE_FORMAT(vt.check_in, "%m") = ${month}  and v.id=${id}`;

    return this.sequelize.query(customQuery, { type: Sequelize.QueryTypes.SELECT }).then(function (records) {
      return records;
    })
  }

  _getOnSiteVisitors() {
    let customQuery = `SELECT vt.id as id,vt.verification_code, v.visitor_image, v.full_name as name, v.mobile_number as mobile_number, vt.purpose_of_visit as purpose,
    vt.host_name as host, DATE_FORMAT(vt.check_in, "%m/%d/%Y %h:%i:%s") as time_in, IF(vt.is_verified = 1, 'Verified',IF(vt.is_verified =0,'Pending',IF(vt.is_verified=2,'Rejected','Unknown'))) as status 
    FROM vms_visitors_transactions vt LEFT JOIN vms_visitors v ON v.id=vt.visitor_id WHERE date_format(check_in,'%Y-%m-%d') >= date_format(now(),'%Y-%m-%d')`;

    return this.sequelize.query(customQuery, { type: Sequelize.QueryTypes.SELECT }).then(function (records) {
      return records;
    })
  }

  _getCheckOutVisitors() {
    let customQuery = `SELECT vt.id as id, v.full_name as name, v.mobile_number as mobile_number, vt.purpose_of_visit as purpose,
    vt.host_name as host, DATE_FORMAT(vt.check_out, "%m/%d/%Y %h:%i:%s") as time_out, IF(vt.is_verified = 1, 'Verified',IF(vt.is_verified =0,'Pending',IF(vt.is_verified=2,'Rejected','Unknown'))) as status 
    FROM vms_visitors_transactions vt LEFT JOIN vms_visitors v ON v.id=vt.visitor_id WHERE date_format(check_in,'%Y-%m-%d') >= date_format(now(),'%Y-%m-%d');`;

    return this.sequelize.query(customQuery, { type: Sequelize.QueryTypes.SELECT }).then(function (records) {
      return records
    })
  }

  _getHostsList() {
    let customQuery = `SELECT vh.id,vh.full_name,vh.department,vh.email_address,vh.mobile_number,
    (SELECT GROUP_CONCAT( DISTINCT (v.full_name)) FROM vms_visitors_transactions vt LEFT JOIN vms_visitors v ON v.id=vt.visitor_id WHERE vt.host_id=vh.id AND DATE_FORMAT(vt.check_in, "%Y-%m-%d") >=DATE_FORMAT(now(),"%Y-%m-%d") ORDER BY vt.check_in DESC LIMIT 1) as visited_by
    FROM vms_hosts vh;`;

    return this.sequelize.query(customQuery, { type: Sequelize.QueryTypes.SELECT }).then(function (records) {
      return records
    })
  }

  _addVisitorTransaction(visit_purpose, host_name, has_appointment, visitor_identity, is_verified, host_id, check_in, visitor_id, has_code) {
    let verification_code = '';

    if (has_code) {
      verification_code = randomize('Aa0', 6);
      return this._defineModel().create({
        visitor_id: visitor_id,
        check_in: check_in,
        has_appointment: has_appointment,
        host_name: host_name,
        purpose_of_visit: visit_purpose,
        is_verified: is_verified,
        host_id: host_id,
        verification_code: verification_code
      })
    } else {
      return this._defineModel().create({
        visitor_id: visitor_id,
        // check_in: check_in,
        has_appointment: has_appointment,
        host_name: host_name,
        purpose_of_visit: visit_purpose,
        is_verified: is_verified,
        host_id: host_id
      })
    }  
  }

  static VISITORTRANSACTION = class {
    static get ONQUEUEVISITORS() {
      return new VisitorTransaction()._getOnQueueVisitors();
    }

    static APPROVEVISITORS(id) {
      return new VisitorTransaction()._approveVisitor(id);
    }

    static REJECTVISITORS(id) {
      return new VisitorTransaction()._rejectVisitor(id);
    }

    static VERIFICATIONCODE(id){
      return new VisitorTransaction()._getVerificationCode(id);
    }

    static VERIFYQRCODE(verification_code, email_address) {
      return new VisitorTransaction()._verifyQrCode(verification_code, email_address);
    }

    static CHECKOUTVISITOR(verification_code) {
      return new VisitorTransaction()._checkoutVisitor(verification_code);
    }

    static VERIFYCODE(verification_code) {
      return new VisitorTransaction()._verifyCode(verification_code);
    }

    static VERIFYVISITOR(id) {
      return new VisitorTransaction()._verifyVisitor(id);
    }

    static VISITORMONTHLYCOUNT(id, month) {
      return new VisitorTransaction()._getVisitorMonthlyCount(id, month);
    }

    static VISITORVISITS(id, month) {
      return new VisitorTransaction()._getVisitorVisits(id, month);
    }

    static get ONSITEVISITORS() {
      return new VisitorTransaction()._getOnSiteVisitors();
    }

    static get CHECKOUTVISITORS() {
      return new VisitorTransaction()._getCheckOutVisitors();
    }

    static HOSTSLIST() {
      return new VisitorTransaction()._getHostsList();
    }

    static ADDVISITORTRANS(visit_purpose, host_name, has_appointment, visitor_identity, is_verified, host_id, check_in, visitor_id, has_code) {
      return new VisitorTransaction()._addVisitorTransaction(visit_purpose, host_name, has_appointment, visitor_identity, is_verified, host_id, check_in, visitor_id, has_code);
    }
  }

}
module.exports.VisitorTransaction = VisitorTransaction;

