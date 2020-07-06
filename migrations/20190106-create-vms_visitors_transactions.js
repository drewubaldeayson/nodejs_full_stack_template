'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('vms_visitors_transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      check_in: {
        allowNull: false,
        type: Sequelize.DATE
      },
      check_out: {
        allowNull: true,
        type: Sequelize.DATE
      },
      has_appointment: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      host_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      purpose_of_visit: {
        allowNull: false,
        type: Sequelize.STRING
      },
      verification_code: {
        allowNull: true,
        type: Sequelize.STRING
      },
      is_verified: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      host_id: {
        type: Sequelize.INTEGER,
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        allowNull: false,
        references: {
          model: 'vms_hosts',
          key: 'id'
        }
      },
      visitor_id: {
        type: Sequelize.INTEGER,
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        allowNull: false,
        references: {
          model: 'vms_visitors',
          key: 'id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('vms_visitors_transactions');
  }
};