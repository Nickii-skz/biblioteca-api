"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {

    const campos = {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    };

    await queryInterface.createTable("Rols", campos);

    await queryInterface.createTable("Permisos", campos);

    await queryInterface.createTable("RolPermisos", {
      rol_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Rols",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      permiso_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Permisos",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    });

  },

  async down(queryInterface) {
    await queryInterface.dropTable("RolPermisos");
    await queryInterface.dropTable("Permisos");
    await queryInterface.dropTable("Rols");
  },
};