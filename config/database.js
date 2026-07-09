const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
"biblioteca", // Base de datos
"postgres", // Usuario
"12345", // Contraseña
{
host: "localhost",
dialect: "postgres",
logging: false
}
);
module.exports = sequelize;