const Rol = require("../models/Rol");

exports.getAll = async () => {
  return await Rol.findAll();
};

exports.getById = async (id) => {
  return await Rol.findByPk(id);
};

exports.create = async (datosRol) => {
  return await Rol.create(datosRol);
};

exports.update = async (id, datosRol) => {
  const rol = await Rol.findByPk(id);

  if (!rol) {
    return null;
  }

  rol.nombre = datosRol.nombre;
  rol.descripcion = datosRol.descripcion;

  await rol.save();

  return rol;
};

exports.delete = async (id) => {
  const rol = await Rol.findByPk(id);

  if (!rol) {
    return null;
  }

  await rol.destroy();

  return rol;
};