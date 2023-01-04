const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const animalController = require("../controllers/animals");
const accountController = require("../controllers/account");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/:id", ensureAuth, animalController.getAnimals);
router.delete("/deleteAnimal/:id", animalController.deleteAnimal);
router.get("/editPost/:id", ensureAuth, animalController.getEdit);
router.put("/editPost/:id", animalController.editPost);

module.exports = router;
