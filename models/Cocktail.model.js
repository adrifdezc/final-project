const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cocktailSchema = new Schema({

  idDrink: String,
  strDrink: String,
  strTags: String,
  strCategory: String,
  strIBA: String,
  strAlcoholic: String,
  strGlass: String,
  strInstructions: String,
  strDrinkThumb: String,
  StrIngredient1: String,
  StrIngredient2: String,
  StrIngredient3: String,
  StrIngredient4: String,
  StrIngredient5: String,
  StrIngredient6: String,
  StrIngredient7: String,
  StrMeasure1: String,
  StrMeasure2: String,
  StrMeasure3: String,
  StrMeasure4: String,
  StrMeasure5: String,
  StrMeasure6: String,
  StrMeasure7: String,
});

module.exports = model("Cocktail", cocktailSchema);
