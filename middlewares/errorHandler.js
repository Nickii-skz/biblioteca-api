const errorHandler = (error, req, res, next) => {
  let code = error.status || 500;
  let message = error.message;

  switch (error.name) {
    case "SequelizeUniqueConstraintError":
      code = 409;
      message = "Ya existe un registro con esos datos.";
      break;

    case "SequelizeValidationError":
      code = 400;
      message = "Los datos enviados no son válidos.";
      break;

    default:
      if (code === 500) {
        message = "Ha ocurrido un error en el servidor.";
      }
      break;
  }

  return res.status(code).json({
    error: message,
  });
};

module.exports = errorHandler;