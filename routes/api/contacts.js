const express = require("express");

const ctrl = require("../../controllers/controllers");

const { validateBody } = require("../../utils/index");

const {
  addSchema,
  updateFavoriteSchema
} = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validateBody(addSchema.addShema), ctrl.getAdd);

router.delete("/:contactId", ctrl.getRemove);

router.put("/:contactId", validateBody(addSchema.addShema), ctrl.getUpdate);

router.patch("/:contactId/favorite", validateBody(updateFavoriteSchema.addShema), ctrl.getFavorite);


module.exports = router;