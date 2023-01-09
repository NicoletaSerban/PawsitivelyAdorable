const Animal = require("../models/Animal");
const User = require("../models/User");
const Review = require("../models/Review");

module.exports = {
  getMain: async (req, res) => {
    Animal.find({})
      .then((feeds) => {
        // Shuffle the array of posts using the sort() method so the posts appears random
        const feed = feeds.sort(() => 0.5 - Math.random());

        res.render("home.ejs", { feeds: feed, user: req.user });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error fetching posts");
      });
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
