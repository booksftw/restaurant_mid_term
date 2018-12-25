"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

const DataHelpers = require('./utils/data-helpers.js');


// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

/**
 *  ~ How to Get Data from DB?
 *  Here's a sample playground for you.
 * 
 */
app.get("/demo", (req, res) => {
  //
  // * Promise.all returns a single array with all the data.
  // * We can handle that array with the .then operator.
  //
  //
  let nzTestResult = Promise.all(
    [
      // ! Restaurants and Menus returning only the first key
      DataHelpers.getRestaurant(),
      DataHelpers.getMenus(),
      DataHelpers.getDishes(),
    ]
  ).then(
    (val) => {
      // ? val[0] - restaurant, val[1] - menus, val[2] - dishes
      console.log(val[0], 'restraunt')

      const templateData = {
        restr: val[0],
        menus: val[1],
        dishes: val[2],
        test: 'Merry Xmas'
      }
      res.render('get-data-sample', templateData);
    }
  )

});

// Home page
app.get("/", (req, res) => {
  let result = DataHelpers.getRestaurant();
  result.then((value) => {
    console.log(value, 'val')

    const restrauntData = value;
    const templateData = {
      restr: restrauntData
    }

    res.render("index", templateData);
  });
});

// Home page
app.get("/orders", (req, res) => {
  res.render("orders");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
