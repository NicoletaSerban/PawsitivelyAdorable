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
  // rateUser: async (req, res) => {
  //   try {
  //     await User.findOneAndUpdate(
  //       { _id: req.params.id },
  //       {
  //         // increment proprety likes by one
  //         $set: {
  //           rating:
  //         }
  //       }
  //     )
  //   }
  // }
};
