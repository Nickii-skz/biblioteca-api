const { Sequelize } = require("sequelize");
require("dotenv").config();

console.log(__dirname);
console.log(process.cwd());

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

module.exports = sequelize;
module.exports = sequelize;