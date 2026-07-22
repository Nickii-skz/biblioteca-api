const bcrypt = require("bcrypt");
const { User, Rol, Permiso } = require("../models");
const token = require("../utils/jwt");

const register = async ({ username, email, password }) => {
  const rol = await Rol.findOne({
    where: { nombre: "user" },
  });

  if (!rol) {
    const error = new Error("El rol user no está configurado");
    error.status = 500;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: passwordHash,
    rol_id: rol.id,
  });

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    rol_id: user.rol_id,
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email },
    include: [
      {
        model: Rol,
        include: [
          {
            model: Permiso,
            through: { attributes: [] },
          },
        ],
      },
    ],
  });

  if (!user) {
    const error = new Error("Credenciales inválidas");
    error.status = 401;
    throw error;
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    const error = new Error("Credenciales inválidas");
    error.status = 401;
    throw error;
  }

  return token.generateToken({
    id: user.id,
    role: user.Rol.nombre,
    permisos: user.Rol.Permisos.map((permiso) => permiso.nombre),
  });
};

module.exports = {
  register,
  login,
};