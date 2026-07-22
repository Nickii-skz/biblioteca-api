const express = require("express");
const permisoController = require("../controllers/permiso.controller");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize("admin"),
  permisoController.getAll
);

router.get(
  "/:id",
  authenticate,
  authorize("admin"),
  permisoController.getById
);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  permisoController.create
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  permisoController.update
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  permisoController.delete
);

module.exports = router;