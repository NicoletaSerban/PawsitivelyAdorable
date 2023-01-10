const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const filterController = require("../controllers/filter");
const homeController = require("../controllers/home");

// const postsController = require("../controllers/profile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getMain);

// filter routes for the main page
router.get("/filter", filterController.getFilter);

// Routes for the user page

// get user page
router.get("/user/:id", homeController.getUser);
// rate  user p
router.put("/user/rate/:id", ensureAuth, homeController.putRate);
// report  user
router.put("/user/reported/:id", ensureAuth, homeController.putReported);

//auth routes
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/logout", authController.logout);

module.exports = router;
