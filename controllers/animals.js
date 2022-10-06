const Animal = require("../models/Animal");
const User = require("../models/User");

module.exports = {
  getAnimals: async (req, res) => {
    try {
      // finding all the post with the associed id
      const animal = await Animal.findById(req.params.id);

      res.render("animals.ejs", { animal: animal, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
};
