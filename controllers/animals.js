const cloudinary = require("../middleware/cloudinary");
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
  getEdit: async (req, res) => {
    const animal = await Animal.findById(req.params.id);

    try {
      // rendering profile page with the data from the DB
      res.render("editPost.ejs", { user: req.user, animal: animal });
    } catch (err) {
      console.log(err);
    }
  },
  editPost: async (req, res) => {
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
      await Animal.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: req.body,
        }
      );
      console.log("Post edited");
      res.redirect(`/animal/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },

  deleteAnimal: async (req, res) => {
    try {
      let animalPost = await Animal.findById({ _id: req.params.id });

      // delete img from cloudinary

      await cloudinary.uploader.destroy(animalPost.cloudinaryId);

      // Delete post from db
      await animalPost.remove({ _id: req.params.id });
      console.log("Deleted Animal Post");
      res.redirect("/account");
    } catch (err) {
      res.redirect("/account");
    }
  },
};
