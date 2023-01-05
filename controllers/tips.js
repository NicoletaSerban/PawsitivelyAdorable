const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");

module.exports = {
  getTips: async (req, res) => {
    try {
      res.render("tips&tricks.ejs", { user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
};
