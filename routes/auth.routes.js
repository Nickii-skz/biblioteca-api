const express = require("express");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");
const authController=require("../controllers/auth.controller");
const router = express.Router();
// Ruta pública
router.post("/register", authController.register);
router.post("/login", authController.login);
// Ruta protegida (solo usuarios autenticados)
router.get("/dashboard", authenticate, authorize(), (req, res) => {
  res.json({ message: "Bienvenido al panel", userId: req.user.id });
});
// Ruta protegida y restringida (solo administradores)
router.post("/admin/users", authenticate, authorize("admin"), (req, res) => {
  res.json({ message: "Usuario creado exitosamente" });
});
module.exports=router;