const Sequelize = require("sequelize");

class Visitor extends Sequelize.Model {
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
        company: DataTypes.STRING,
        mobile_number: DataTypes.STRING,
        email_address: DataTypes.STRING,
        visitor_image: DataTypes.STRING,
        visitor_identity: DataTypes.STRING,
      },
      {
        tableName: "vms_visitors",
        sequelize
      }
    );
  }

  _defineModel() {
    return this.sequelize.define('vms_visitors', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      full_name: {
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING
      },
      email_address: {
        type: Sequelize.STRING
      },
      mobile_number: {
        type: Sequelize.STRING
      },
      visitor_image: {
        type: Sequelize.STRING
      },
      visitor_identity: {
        type: Sequelize.STRING
      }
    })
  }

  _getVisitors() {
    let customQuery = `SELECT DISTINCT v.id, v.full_name, v.mobile_number,v.company,v.email_address,v.visitor_image FROM vms_visitors v LEFT JOIN vms_visitors_transactions vt ON vt.visitor_id=v.id WHERE date_format(vt.check_in,'%Y-%m-%d') >= date_format(now(),'%Y-%m-%d');`;

    return this.sequelize.query(customQuery, { type: Sequelize.QueryTypes.SELECT }).then(function (records) {
      return records
    })
  }

  _addVisitor(full_name, mobile_number, company, email_address, identity, image_path, is_scheduled) {
    if(is_scheduled){
      return this._defineModel().create({
        full_name: full_name,
        company: company,
        email_address: email_address,
        mobile_number: mobile_number,
        visitor_identity: identity
      });
    }else{
      return this._defineModel().create({
        full_name: full_name,
        company: company,
        email_address: email_address,
        mobile_number: mobile_number,
        visitor_identity: identity,
        visitor_image: image_path
      });
    }
    
  }

  _updateVisitor(id, full_name, company, email_address, mobile_number){
    return this._defineModel().update({
      full_name: full_name,
      company: company,
      email_address: email_address,
      mobile_number: mobile_number
    },{
      where : {id: id}
    });
  }

  _verifyEmail(email_address){
    return this._defineModel().findAll({ where: { email_address: email_address }});
  }

  _selectVisitor(email_address){
    return this._defineModel().findOne({ where: { email_address: email_address }});
  }

  _updateImagePath(id,image_path){
    return this._defineModel().update({
      visitor_image: image_path
    },{
      where : {id: id}
    });
  }

  static VISITOR = class {
    static get VISITORS() {
      return new Visitor()._getVisitors();
    }

    static ADDVISITOR(full_name, mobile_number, company, email_address, identity, image_path, is_scheduled) {
      return new Visitor()._addVisitor(full_name, mobile_number, company, email_address, identity, image_path, is_scheduled);
    }

    static UPDATEVISITOR(id, full_name, company, email_address, mobile_number) {
      return new Visitor()._updateVisitor(id, full_name, company, email_address, mobile_number);
    }

    static VERIFYEMAIL(email_address) {
      return new Visitor()._verifyEmail(email_address);
    }

    static SELECTVISITOR(email_address) {
      return new Visitor()._selectVisitor(email_address);
    }

    static UPDATEIMAGEPATH(id,image_path){
      return new Visitor()._updateImagePath(id,image_path);
    }

  }

}
module.exports.Visitor = Visitor;
