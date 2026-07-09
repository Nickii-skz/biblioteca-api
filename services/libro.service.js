const Libro = require('../models/Libro');

exports.getAll=async()=>{
    return await Libro.getAll();
};
exports.getById=async(id)=>{
    return await Libro.getById(id);
}

exports.create=async(libro)=>{
    return await Libro.create(libro);
}
exports.update=async(id,libro)=>{
    return await Libro.update(id,libro);
}
exports.delete=async(id)=>{
    return await Libro.delete(id);
}