"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

const DataHelpers = require('./utils/data-helpers.js');

/**
 * How to get Data from database?
 * SAMPLE CODE - full list of functions in ./utils/data-helper.js file
 *
 */

  // let result = DataHelpers.getRestaurant();
  // result.then( (value)=>{
  //   console.log(value, 'val')
  // })

/**
 * End Sample
 */

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
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
 *  *Demo - Get Data from DB
 *  Visit localhost:8080/get_data_demo and edit /views/get-data-sample.ejs to play with this
 *
 */
app.get("/demo", (req, res) => {
  let result = DataHelpers.getRestaurant();
  result.then( (value)=>{
    console.log(value, 'val')

    const restrauntData = value;
    const templateData = {
       restr: restrauntData
    }
    res.render("get-data-sample",templateData);
  })
});

// Home page
app.get("/", (req, res) => {
  let result = DataHelpers.getRestaurant();
  result.then( (value)=>{
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
