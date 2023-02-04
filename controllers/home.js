const Animal = require("../models/Animal");
const User = require("../models/User");
const Review = require("../models/Review");

module.exports = {
  getMain: async (req, res) => {
    try {
      const feeds = await Animal.find({});
      const feed = feeds.sort(() => 0.5 - Math.random());
      res.render("home.ejs", { feeds: feed, user: req.user });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching posts");
    }
  },
  getUser: async (req, res) => {
    try {
      // finding all the post with the associed id
      const posts = await Animal.find({ userId: req.params.id });
      const userProfile = await User.findById(req.params.id);
      const user = await User.findById(req.user.id);
      // rendering profile page with the data from the DB
      res.render("user.ejs", {
        posts: posts,
        userProfile: userProfile,
        user: user,
      });
    } catch (err) {
      console.log(err);
    }
  },

  // it add +1 when the paw is clicked and hecks to see if the user has clicked yet the adorable btn
  putAdorable: async (req, res) => {
    try {
      const userBeingAdorable = await User.findById(req.params.id);
      // check if the user has already given a rating
      if (userBeingAdorable.ratedUsers.includes(req.user.id)) {
        return res.status(400).send("You have already given a rating.");
      }
      // increment rating by +1
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { rating: 1 },
        }
      );
      // add user id to the rated users array
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { ratedUsers: req.user.id },
        }
      );
      console.log("Rating +1");
      res.redirect(`/user/${req.params.id}`);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error updating rating.");
    }
  },

  // it add +1 when the sad face is clicked and checks to see if the user has clicked yet the reported
  putReported: async (req, res) => {
    try {
      const userBeingReported = await User.findById(req.params.id);

      // check if the user has already given a rating
      if (userBeingReported.reportedUsers.includes(req.user.id)) {
        return res.status(400).send("You have already reported this user.");
      }
      // increment rating by +1
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { rating: 1 },
        }
      );
      // add user id to the rated users array
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { reportedUsers: req.user.id },
        }
      );
      console.log("Report +1");
      res.redirect(`/user/${req.params.id}`);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error updating report.");
    }
  },
};
