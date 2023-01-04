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
  getRate: async (req, res) => {
    try {
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { rating: 1 },
        }
      );
      console.log("Adorable +1");
      res.redirect(`/user/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  getReported: async (req, res) => {
    try {
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { reported: 1 },
        }
      );
      console.log("Reported +1");
      res.redirect(`/user/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
};
