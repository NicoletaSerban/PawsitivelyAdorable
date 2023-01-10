const mongoose = require("mongoose");

// setting up the blueprint
const AnimalSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  likes: {
    type: String,
  },
  dislikes: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  forAdoption: {
    type: String,
    required: true,
  },
  forFoster: {
    type: String,
    required: true,
  },
  // user associated with the particular Post from DB
  userId: {
    type: mongoose.Schema.Types.ObjectId,

    // referred to User form our models
    ref: "User",
  },
  specialNeeds: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  createdByName: {
    type: String,
    ref: "User",
  },

  postDate: {
    type: Date,
    // sets up a date if not is specified
    default: Date.now,
  },
});

// implement the Schema, specify also the collection where to store (Posts)
module.exports = mongoose.model("Animal", AnimalSchema);
