const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const animalUpdatesController = require("../controllers/animalUpdates");
const animalController = require("../controllers/animals");
const upload = require("../middleware/multer");
const accountController = require("../controllers/account");
const { ensureAuth } = require("../middleware/auth");

// const postsController = require("../controllers/profile");
// const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", animalUpdatesController.getAnimalUpdates);
router.get(
  "/createAnimalUpdates",
  ensureAuth,
  animalUpdatesController.getPetUpdates
);
router.post(
  "/createAnimalUpdates",
  ensureAuth,
  upload.single("file"),
  animalUpdatesController.createPetUpdates
);

// Edit&Delete Updates
router.delete("/deleteUpdates/:id", animalUpdatesController.deleteUpdates);
router.get(
  "/editUpdates/:id",
  ensureAuth,
  animalUpdatesController.getEditUpdates
);
router.put("/editUpdates/:id", animalUpdatesController.editUpdates);

module.exports = router;
