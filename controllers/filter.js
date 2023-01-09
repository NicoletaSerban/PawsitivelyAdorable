const Animal = require("../models/Animal");

module.exports = {
  getFilter: async (req, res) => {
    console.log(req.body);
    const feed = await Animal.find({
      type: req.body.type,
      forAdoption: req.body.forAdoption,
      forFoster: req.body.forFoster,
      location: req.body.location,
    })
      .sort({ postDate: "desc" })
      .lean();

    res.render("home.ejs", { feed: feed, user: req.user });
  },
};
module.exports = {
  getFilter: async (req, res) => {
    console.log(req.body);

    // Create an empty filter object
    const filter = {};

    // Check if the request body has a 'type' field, and add it to the filter object if it does
    if (req.body.type) {
      filter.type = req.body.type;
    }

    // Check if the request body has a 'forAdoption' field, and add it to the filter object if it does
    if (req.body.forAdoption) {
      filter.forAdoption = req.body.forAdoption;
    }

    // Check if the request body has a 'forFoster' field, and add it to the filter object if it does
    if (req.body.forFoster) {
      filter.forFoster = req.body.forFoster;
    }

    // Check if the request body has a 'location' field, and add it to the filter object if it does
    if (req.body.location) {
      filter.location = req.body.location;
    }

    // Query the Animal collection with the filter object
    const feeds = await Animal.find(filter).sort({ postDate: "desc" }).lean();

    // Render the home view template with the filtered results and the user object
    res.render("home.ejs", { feeds: feeds, user: req.user });
  },
};
