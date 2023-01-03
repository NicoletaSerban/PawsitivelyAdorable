const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const newspaperController = require("../controllers/newspaper");

// const postsController = require("../controllers/profile");
// const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", newspaperController.getNews);

module.exports = router;
