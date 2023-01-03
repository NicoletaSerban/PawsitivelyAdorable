const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");

module.exports = {
  getNews: async (req, res) => {
    try {
      res.render("newspaper.ejs", { user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
};
