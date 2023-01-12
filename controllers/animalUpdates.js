const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");
const Pet = require("../models/animalUpdates");
const Animal = require("../models/Animal");

module.exports = {
  getAnimalUpdates: async (req, res) => {
    const pets = await Pet.find().sort({ takeAwayDate: "desc" });

    res.render("animalUpdates.ejs", {
      user: req.user,
      pets: pets,
    });
  },
  getPetUpdates: async (req, res) => {
    try {
      // rendering profile page with the data from the DB
      const pets = await Pet.find().sort({ takeAwayDate: "desc" });

      res.render("createAnimalUpdates.ejs", {
        user: req.user,
        pets: pets,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createPetUpdates: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "pawsitivelyAdorableUpdates",
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
  getEditUpdates: async (req, res) => {
    const pets = await Pet.findById(req.params.id);

    try {
      // rendering profile page with the data from the DB
      res.render("editUpdates.ejs", { user: req.user, pets: pets });
    } catch (err) {
      console.log(err);
    }
  },
  editUpdates: async (req, res) => {
    //iterate to see if the body is empty or not
    Object.keys(req.body).forEach((key) => {
      if (
        req.body[key] == null ||
        req.body[key] == undefined ||
        req.body[key] == ""
      ) {
        delete req.body[key];
      }
    });
    try {
      await Pet.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: req.body,
        }
      );
      console.log("Update edited");
      res.redirect(`/animalUpdates`);
    } catch (err) {
      console.log(err);
    }
  },

  deleteUpdates: async (req, res) => {
    try {
      let petUpdate = await Pet.findById({ _id: req.params.id });

      // delete img from cloudinary
      await cloudinary.uploader.destroy(petUpdate.cloudinaryId);

      // Delete post from db
      await petUpdate.remove({ _id: req.params.id });
      console.log("Deleted Animal Update");
      res.redirect("/animalUpdates");
    } catch (err) {
      res.redirect("/animalUpdates");
    }
  },
};
