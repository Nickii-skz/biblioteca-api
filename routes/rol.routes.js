const express = require("express");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");
const rolController = require("../controllers/rol.controller");

const router = express.Router();
const admin = [authenticate, authorize("admin")];

router.get("/", ...admin, rolController.getAll);
router.get("/:id", ...admin, rolController.getById);
router.post("/", ...admin, rolController.create);
router.put("/:id", ...admin, rolController.update);
router.delete("/:id", ...admin, rolController.delete);

module.exports = router;