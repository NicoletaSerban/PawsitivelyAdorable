const express = require("express");
const router = express.Router();
const animalController = require("../controllers/animals");
const accountController = require("../controllers/account");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/:id", ensureAuth, animalController.getAnimals);
// router.put("/rating/:id", animalController.rateUser);
module.exports = router;
