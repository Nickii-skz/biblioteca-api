const Permiso = require("../models/Permiso");

exports.getAll = async () => {
  return await Permiso.findAll();
};

exports.getById = async (id) => {
  return await Permiso.findByPk(id);
};

exports.create = async (permiso) => {
  return await Permiso.create(permiso);
};

exports.update = async (id, datosPermiso) => {
  const permiso = await Permiso.findByPk(id);

  if (!permiso) {
    return null;
  }

  permiso.nombre = datosPermiso.nombre;
  permiso.descripcion = datosPermiso.descripcion;

  await permiso.save();

  return permiso;
};

exports.delete = async (id) => {
  const permiso = await Permiso.findByPk(id);

  if (!permiso) {
    return null;
  }

  await permiso.destroy();

  return permiso;
};