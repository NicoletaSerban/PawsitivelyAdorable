const Animal = require("../models/Animal");

module.exports = {
  getFilter: async (req, res) => {
    console.log(req.body);
    const feed = await Animal.find({
      type: req.body.type,
      forAdoption: req.body.forAdoption,
      forFoster: req.body.forFoster,
      //   location: req.body.location,
    })
      .sort({ postDate: "desc" })
      .lean();

    res.render("home.ejs", { feed: feed, user: req.user });
  },
};
