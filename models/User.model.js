const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  rol: {
    type: String,
    enum: ['user','admin'],
    default: 'user',
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cocktail",
    },
  ],
  shopping: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ingredient",
    },
  ],
});

module.exports = model("User", userSchema);
