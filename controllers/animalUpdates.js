const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");
const Pet = require("../models/animalUpdates");
const Animal = require("../models/Animal");

module.exports = {
  getAnimalUpdates: async (req, res) => {
    const pet = await Pet.find().sort({ takeAwayDate: "desc" });
    res.render("animalUpdates.ejs", { user: req.user, pet: pet });
  },
  getPetUpdates: async (req, res) => {
    try {
      // rendering profile page with the data from the DB
      const pet = await Pet.find().sort({ takeAwayDate: "desc" });
      res.render("createAnimalUpdates.ejs", { user: req.user, pet: pet });
    } catch (err) {
      console.log(err);
    }
  },
  createPetUpdates: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "adopt-me",
      });

      // create a new post in Db using our post model
      await Pet.create({
        name: req.body.name,
        updates: req.body.updates,
        struggles: req.body.struggles,
        adoptedByName: req.body.adoptedByName,
        cloudinaryId: result.public_id,
        image: `https://res.cloudinary.com/happy18/image/upload/ar_1:1,c_fill,g_auto,w_1000/v1664364719/${result.public_id}.jpg`,
        takeAwayDate: req.body.takeAwayDate,
        userId: req.user.id,
      });
      console.log("Animal has been updated!");
      res.redirect("/animalUpdates");
    } catch (err) {
      console.log(err);
    }
  },
};
