const express = require("express");
const router = express.Router();
const animalController = require("../controllers/animals");

router.get("/:id", animalController.getAnimals);

module.exports = router;
