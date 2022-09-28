const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Animal");
const User = require("../models/User");

module.exports = {
  getPost: async (req, res) => {
    try {
      // finding all the post with the associed id

      // rendering profile page with the data from the DB
      res.render("account.ejs");
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // create a new post in Db using our post model
      await Post.create({
        name: req.body.name,
        age: req.body.age,
        type: req.body.type,
        description: req.body.description,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        specialNeeds: req.body.specialNeeds,
        forAdoption: req.body.forAdoption,
        forFoster: req.body.forFoster,
        image: result.secure.url,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.render("account.ejs");
    } catch (err) {
      console.log(err);
    }
  },
};
