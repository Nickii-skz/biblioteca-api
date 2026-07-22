"use strict";

module.exports = {
  async up(queryInterface) {
    const fecha = new Date();

    const roles = [
      {
        nombre: "admin",
        descripcion: "Administrador",
        createdAt: fecha,
        updatedAt: fecha,
      },
      {
        nombre: "user",
        descripcion: "Usuario",
        createdAt: fecha,
        updatedAt: fecha,
      },
    ];

    await queryInterface.bulkInsert("Rols", roles);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Rols", {
      nombre: ["admin", "user"],
    });
  },
};