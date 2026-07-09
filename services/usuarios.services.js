const Usuario = require('../models/Usuarios');

exports.getAll = async () => {
    return await Usuario.findAll();
};

exports.getById = async (id) => {
    return await Usuario.findByPk(id);
};

exports.create = async (usuario) => {
    return await Usuario.create(usuario);
};

exports.update = async (id, usuario) => {
    const usuarioEncontrado = await Usuario.findByPk(id);

    if (!usuarioEncontrado) {
        return null;
    }

    return await usuarioEncontrado.update(usuario);
};

exports.delete = async (id) => {
    const usuarioEncontrado = await Usuario.findByPk(id);

    if (!usuarioEncontrado) {
        return null;
    }

    await usuarioEncontrado.destroy();

    return usuarioEncontrado;
};