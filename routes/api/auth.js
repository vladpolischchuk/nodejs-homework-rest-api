const express = require("express");

const { validateBody } = require("../../utils/index");

const { authenticate } = require("../../middlewares/index");

const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/auth-controllers");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout)

module.exports = router;