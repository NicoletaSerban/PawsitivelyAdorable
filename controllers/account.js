const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Animal");
const User = require("../models/User");
const Review = require("../models/Review");

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
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "adopt-me",
      });

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
  getEdit: async (req, res) => {
    try {
      // rendering profile page with the data from the DB
      res.render("editPost.ejs", { user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  editPost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
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
        }
      );
      console.log("Post edited");
      res.redirect(`/account/editPost/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      let animalPost = await Post.findById({ _id: req.params.id });

      // delete img from cloudinary

      await cloudinary.uploader.destroy(animalPost.cloudinaryId);

      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Animal Post");
      res.redirect("/account");
    } catch (err) {
      res.redirect("/account");
    }
  },
  // getReview: async (req, res) => {
  //   try {
  //     const review = await Review.findById(req.params.id);
  //     // rendering profile page with the data from the DB
  //     res.render("animals.ejs", { user: req.user, reviews: review });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
};
