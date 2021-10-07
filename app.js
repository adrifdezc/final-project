require("dotenv/config");
require("./db");
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware"); // <== IMPORT


const app = express();
require("./config")(app);


// 👇 MIDDLEWARE MISSING
const allRoutes = require("./routes");
app.use("/api", allRoutes);

const cocktailRoutes = require("./routes/cocktail.routes");
app.use("/api", cocktailRoutes);

const authRouter = require("./routes/auth.routes");
app.use("/api/auth", authRouter);




require("./error-handling")(app);

module.exports = app;
