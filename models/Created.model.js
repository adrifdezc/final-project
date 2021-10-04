const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const createdSchema = new Schema({
    strDrink: String,
    strCategory: String,
    strAlcoholic: String,
    strInstructions: String
},
{
    timestamps: true,
  }
);

module.exports = model ("Created", createdSchema)