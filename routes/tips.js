const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const tipsController = require("../controllers/tips");

// const postsController = require("../controllers/profile");
// const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", tipsController.getTips);

module.exports = router;
