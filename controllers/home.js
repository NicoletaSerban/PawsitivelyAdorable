const Animal = require("../models/Animal");
const User = require("../models/User");
const Review = require("../models/Review");

module.exports = {
  getMain: async (req, res) => {
    const feed = await Animal.find().sort({ postDate: "desc" }).lean();

    res.render("home.ejs", { feed: feed, user: req.user });
  },
  getUser: async (req, res) => {
    try {
      // finding all the post with the associed id
      const posts = await Animal.find({ userId: req.params.id });
      const user = await User.findById(req.params.id);

      // rendering profile page with the data from the DB
      res.render("user.ejs", { posts: posts, user: user });
    } catch (err) {
      console.log(err);
    }
  },
  // getRating: async (req, res) => {
  //   // Calculate the average rating
  //   try {
  //     // insert the new rating into the database
  //     const insert = await Review.insertOne({
  //       userId: req.params.id,
  //       stars: req.body.rate,
  //     });
  //     res.render("user.ejs", { user: req.user });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // addRating: async (req, res) => {
  //   const ratings = await Review.find({ userId: req.params.id });

  //   // calculate the average rating
  //   const averageRating =
  //     ratings.reduce((acc, rating) => acc + rating.stars, 0) / ratings.length;

  //   console.log(averageRating);

  //   // render the average rating in the EJS template
  //   res.render("user.ejs", { averageRating: averageRating });
  // },
  // rateUser: async (req, res) => {
  //   try {
  //     await User.findOneAndUpdate(
  //       { _id: req.params.id },
  //       {
  //         // increment proprety likes by one
  //         $set: {
  //           rating:
  //         }
  //       }
  //     )
  //   }
  // }
};
