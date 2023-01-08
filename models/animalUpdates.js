const mongoose = require("mongoose");

// setting up the blueprint
const AnimalUpdatesSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },

  updates: {
    type: String,
    required: true,
  },

  struggles: {
    type: String,
  },

  // user associated with the particular Post from DB
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    // referred to User form our models
    ref: "User",
  },

  animalId: {
    type: mongoose.Schema.Types.ObjectId,
    // referred to User form our models
    ref: "Animal",
  },

  adoptedByName: {
    type: String,
    ref: "User",
  },

  takeAwayDate: {
    type: String,
  },
});

// implement the Schema, specify also the collection where to store (Posts)
module.exports = mongoose.model("AnimalUpdates", AnimalUpdatesSchema);
