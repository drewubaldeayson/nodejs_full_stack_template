const Sequelize = require("sequelize");

class UserType extends Sequelize.Model {
  constructor() {
    super();
  }
  static initModel(sequelize, DataTypes) {
    this.sequelize=sequelize;
    return super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        user_type: DataTypes.STRING
      },
      {
        tableName: "vms_user_types",
        sequelize
      }
    );
  }
}
module.exports.UserType = UserType;
