const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { isAuthenticated } = require("./../middleware/jwt.middleware.js");

const Cocktail = require("../models/Cocktail.model");

router.post("/add-favorite", (req, res) => {
  const query = ({
    idDrink,
    strDrink,
    strCategory,
    strIBA,
    strAlcoholic,
    strGlass,
    strInstructions,
    strInstructionsDE,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
    strMeasure5,
    strDinkThumb,
  } = req.body.cocktail);
  console.log(query);
  //   const idToCheck = req.body.idDrink;
  //   Cocktail.find({ idDrink: idToCheck }).then((cocktailArray) => {
  //     //comprobar si ese apiId ya esta en db characters
  //     // if (cocktailArray.length === 0) {
  //     Cocktail.create(query)
  //       .then((result) => {
  //         User.findByIdAndUpdate(req.user._id, {
  //           $push: { favorites: result._id },
  //         }).then(() => {
  //           res.history(`/profile`); //history
  //         });
  //       })
  //       .catch((err) => console.log(err));
  //   });
});

module.exports = router;
