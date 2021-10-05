const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { isAuthenticated } = require("./../middleware/jwt.middleware.js");

const Cocktail = require("../models/Cocktail.model");
const User = require("../models/User.model");
const Ingredient = require("../models/Ingredient.model");
const Created = require("../models/Created.model");

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

  console.log("idToCheck", idDrink);
  console.log("QUERY", query);
  Cocktail.findOne({ idDrink: idDrink }).then((cocktail) => {
    console.log("cocktail", cocktail);
    if (!cocktail) {
      Cocktail.create(query).then((result) => {
        User.findByIdAndUpdate(
          req.body.user._id,
          {
            $push: { favorites: result._id },
          },
          { new: true }
        )
          .populate("favorites")
          .then((user) => {
            res.json(user);
          })
          .catch((err) => console.log(err));
      });
    } else {
      User.findByIdAndUpdate(
        req.body.user._id,
        {
          $push: { favorites: cocktail._id },
        },
        { new: true }
      )
        .populate("favorites")
        .then((user) => {
          res.json(user);
        })
        .catch((err) => console.log(err));
    }
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
  Cocktail.find({ idDrink: req.body.cocktail.idDrink }).then((response) => {
    let idNeed = response[0]._id;
    User.findByIdAndUpdate(
      req.body.user._id,
      { $pull: { favorites: idNeed } },
      { new: true }
    )
      .populate("favorites")
      .then((response) => {
        res.json(response);
      })
      .catch((err) => console.log(err));
  });
});

router.post("/add-ingredient", isAuthenticated, (req, res) => {
  Ingredient.create(req.body).then((result) => {
    User.findByIdAndUpdate(req.payload._id, {
      $push: { shopping: result._id },
    }, {new: true})
      .populate("favorites")
      .then((response) => {
        res.status(200).json( response);
      });
  });
});

//show cart
router.post("/cart", (req, res, next) => {
  User.findById(req.body.user._id)
    .populate("shopping")
    .then((allIngredients) => {
      res.json(allIngredients);
    })
    .catch((err) => res.json(err));
});

//delete from cart
router.post("/delete-cart", (req, res) => {
  const { _id } = req.body.ingredient;
  User.findByIdAndUpdate(
    req.body.user._id,
    {
      $pull: { shopping: _id },
    },
    { new: true }
  )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => console.log(err));
});

//Creates new cocktail
router.post("/create-cocktail", (req, res, next) => {
  const { strDrink, strCategory, strAlcoholic, strInstructions } = req.body;

  Created.create({
    strDrink,
    strCategory,
    strAlcoholic,
    strInstructions,
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => res.json(err));
});

//Fetch created Cocktails from collection Created
router.get("/create-cocktail", (req, res) => {
  Created.find({}).then((response) => res.json(response));
});



module.exports = router;
