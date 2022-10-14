const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    validate: { validator: Number.isInteger },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    // referred to User form our models
    ref: "User",
  },

  ratingDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
