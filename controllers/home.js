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
      res.render("user.ejs", {
        posts: posts,
        user: user,
      });
    } catch (err) {
      console.log(err);
    }
  },

  // it add +1 when the paw is clicked and hecks to see if the user has clicked yet the adorable btn
  putRate: async (req, res) => {
    try {
      //  to see if the user has already rated the other user
      const currentUser = await User.findOne({ _id: req.user._id });

      // checks if the current user has already rated the user
      if (currentUser.ratedUsers.includes(req.params.id)) {
        // if the current user has already rated the other user throws an error that is passed to ejs
        return res.render("user.ejs", {
          errorRate: "you already rated this user",
        });
      }

      // adds the id of the user that the current user is trying to rate adn pushes in an Array
      currentUser.ratedUsers.push(req.params.id);

      // to save the current user's updated ratedUsers array
      await currentUser.save();

      // increment adorable by +1
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

  // it add +1 when the sad face is clicked and checks to see if the user has clicked yet the reported
  putReported: async (req, res) => {
    try {
      //  to see if the user has already rated the other user
      const currentUser = await User.findOne({ _id: req.user._id });

      // checks if the current user has already rated the user
      if (currentUser.reportedUsers.includes(req.params.id)) {
        // if the current user has already rated the other user throws an error that is passed to ejs
        return res.render("user.ejs", {
          errorReport: "You already rated this user",
        });
      }

      // adds the id of the user that the current user is trying to rate adn pushes in an Array
      currentUser.reportedUsers.push(req.params.id);

      // to save the current user's updated ratedUsers array
      await currentUser.save();

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
