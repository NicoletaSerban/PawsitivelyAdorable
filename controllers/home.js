const Animal = require("../models/Animal");

module.exports = {
  getMain: async (req, res) => {
    const feed = await Animal.find().sort({ postDate: "desc" }).lean();

    res.render("home.ejs", { feed: feed, user: req.user });
  },
};
