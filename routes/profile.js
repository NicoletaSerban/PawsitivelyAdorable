const express = require("express");
const router = express.Router();

const postsController = require("../controllers/profile");
// const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

// check if we are logged in
router.get("/:id", ensureAuth, postsController.getPost);

// using the multer
router.post("/createPost", upload.single("file"), postsController.createPost);

router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
