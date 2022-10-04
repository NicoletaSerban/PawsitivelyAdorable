const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Animal");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      // finding all the post with the associed id
      const posts = await Post.find({ userId: req.user.id });

      // rendering profile page with the data from the DB
      res.render("account.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      // rendering profile page with the data from the DB
      res.render("createPost.ejs", { user: req.user });
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
        location: req.body.location,
        createdByName: req.user.userName,
        cloudinaryId: result.public_id,
        image: `https://res.cloudinary.com/happy18/image/upload/ar_1:1,c_fill,g_auto,w_1000/v1664364719/${result.public_id}.jpg`,
        postDate: req.body.postDate,
        userId: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  },
};
