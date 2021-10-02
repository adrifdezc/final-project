const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ingredientSchema = new Schema({
  idIngredient: String,
  strIngredient: String,
  strDescription: String,
  strType: String,
  strAlcohol: String,
  strABV: String
});

module.exports = model("Ingredient", ingredientSchema);
