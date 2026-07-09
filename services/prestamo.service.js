const { Prestamo, Usuario, Libro } = require('../models');
const sequelize = require('../config/database');
const { Op } = require('sequelize');

exports.getAll = async () => {
    return await Prestamo.findAll({
        include: [
            {
                model: Usuario,
                attributes: ['nombre']
            },
            {
                model: Libro,
                attributes: ['titulo']
            }
        ]
    });
};

exports.getById = async (id) => {
    return await Prestamo.findByPk(id, {
        include: [
            {
                model: Usuario,
                attributes: ['nombre']
            },
            {
                model: Libro,
                attributes: ['titulo']
            }
        ]
    });
};

exports.create = async (prestamo) => {

    const transaction = await sequelize.transaction();

    try {

        const usuario = await Usuario.findByPk(prestamo.usuario_id, {
            transaction
        });

        if (!usuario) {
            throw new Error("El usuario no existe");
        }

        const libro = await Libro.findByPk(prestamo.libro_id, {
            transaction
        });

        if (!libro) {
            throw new Error("El libro no existe");
        }

        const prestamosActivos = await Prestamo.count({
            where: {
                usuario_id: prestamo.usuario_id,
                fecha_devolucion: {
                    [Op.is]: null
                }
            },
            transaction
        });

        if (prestamosActivos >= 3) {
            throw new Error("El usuario ya tiene 3 préstamos activos");
        }

        const libroPrestado = await Prestamo.findOne({
            where: {
                libro_id: prestamo.libro_id,
                fecha_devolucion: {
                    [Op.is]: null
                }
            },
            transaction
        });

        if (libroPrestado) {
            throw new Error("El libro está prestado");
        }

        const nuevoPrestamo = await Prestamo.create(
            {
                usuario_id: prestamo.usuario_id,
                libro_id: prestamo.libro_id,
                fecha_prestamo: new Date()
            },
            {
                transaction
            }
        );

        await transaction.commit();

        return nuevoPrestamo;

    } catch (error) {

        await transaction.rollback();
        throw error;

    }
};

exports.devolucion = async (id) => {

    const prestamo = await Prestamo.findByPk(id);

    if (!prestamo) {
        throw new Error("El préstamo no existe");
    }

    if (prestamo.fecha_devolucion) {
        throw new Error("El préstamo ya fue devuelto");
    }

    return await prestamo.update({
        fecha_devolucion: new Date()
    });

};