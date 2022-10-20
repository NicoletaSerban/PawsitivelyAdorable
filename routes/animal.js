const express = require("express");
const router = express.Router();
const animalController = require("../controllers/animals");
const accountController = require("../controllers/account");

router.get("/:id", animalController.getAnimals);
// router.put("/rating/:id", animalController.rateUser);
module.exports = router;
