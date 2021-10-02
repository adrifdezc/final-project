const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { isAuthenticated } = require("./../middleware/jwt.middleware.js");

const Cocktail = require("../models/Cocktail.model");
const User = require("../models/User.model");
const Ingredient = require("../models/Ingredient.model")

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
  console.log(`Query: `, query);
  const idToCheck = req.body.idDrink;
  Cocktail.find({ idDrink: idToCheck }).then((cocktailArray) => {
    Cocktail.create(query) //Añade cocktail a la coleccion cocktail
      .then((result) => {
        User.findByIdAndUpdate(req.body.user._id, {
          $push: { favorites: result._id },
        }) //CANT FIND _id IN USER
          .then((user) => {
            res.json(user);
          });
      })
      .catch((err) => console.log(err));
  });
});

router.post("/profile", (req, res, next) => {
  User.findById(req.body.user._id)
    .populate("favorites")
    .then((allFavorites) => res.json(allFavorites))
    .catch((err) => res.json(err));
});

//delete from favorites
router.post("/delete-favorite", (req, res) => {
  const { _id } = req.body.cocktail;
  console.log(`id`, _id);
  User.findByIdAndUpdate(req.body.user._id, { $pull: { favorites: _id } })
    .then((response) => {
      console.log("response", response);
      res.json(response);
    })
    .catch((err) => console.log(err));
});




router.post("/add-ingredient", isAuthenticated, (req,res)=>{
  console.log(`ReqbodyING`, req.body)
  console.log("Payload", req.payload);
  Ingredient.create(req.body)
  .then((result)=>{
    User.findByIdAndUpdate(req.payload._id, {
      $push: {shopping: result._id}
    })
    .then(()=>{
      res.status(200)
    })
  })
})

router.post("/cart", (req, res, next) => {
  User.findById(req.body.user._id)
    .populate("shopping")
    .then((allIngredients) => {
      console.log(`Ingredients`, allIngredients)
      res.json(allIngredients)})
    .catch((err) => res.json(err));
});


module.exports = router;
