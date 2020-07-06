'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('vms_hosts_attendance', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      time_in: {
        allowNull: false,
        type: Sequelize.DATE
      },
      time_out: {
        allowNull: true,
        type: Sequelize.DATE
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
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('vms_hosts_attendance');
  }
};