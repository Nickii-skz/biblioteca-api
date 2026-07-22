const permisoService = require("../services/permiso.service");

const getAll = async (req, res, next) => {
  try {
    const permisos = await permisoService.getAll();
    res.status(200).json(permisos);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const permiso = await permisoService.getById(req.params.id);

    if (!permiso) {
      return res.status(404).json({
        message: "Permiso no encontrado",
      });
    }

    res.status(200).json(permiso);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const permiso = await permisoService.create(req.body);

    res.status(201).json({
      message: "Permiso creado correctamente",
      permiso,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const permiso = await permisoService.update(req.params.id, req.body);

    if (!permiso) {
      return res.status(404).json({
        message: "Permiso no encontrado",
      });
    }

    res.status(200).json({
      message: "Permiso actualizado correctamente",
      permiso,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const permiso = await permisoService.delete(req.params.id);

    if (!permiso) {
      return res.status(404).json({
        message: "Permiso no encontrado",
      });
    }

    res.status(200).json({
      message: "Permiso eliminado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: remove,
};