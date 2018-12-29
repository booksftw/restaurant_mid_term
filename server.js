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

const bookshelf = require('bookshelf')(knex);

// * Twilio SMS
const accountSid = 'ACb04a19b41aca7affdb6398243477e0d6'; // Your Account SID from www.twilio.com/console
const authToken = '3c63f219dd4cc8f6798b8649878cf8b9';   // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);


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
 *  A sample playground for you.
 *
 *  Demo Page
 */
app.get("/demo", (req, res) => {
  //
  // * Promise.all returns a single array with all the data.
  // * We can handle that array with the .then operator.
  //
  //
  let demoData = Promise.all(
    [
      // ! Restaurants and Menus returning only the first key
      DataHelpers.getRestaurant(),
      DataHelpers.getMenus(),
      DataHelpers.getItems(),
    ]
  ).then(
    (val) => {
      // ? val[0] - restaurant, val[1] - menus, val[2] - items
      console.log(val[0], 'restaurant')

      const templateData = {
        restr: val[0],
        menus: val[1],
        items: val[2],
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

    const restaurantData = value;
    const templateData = {
      restr: restaurantData
    }

    res.render("index", templateData);
  });
});

// Orders page
app.get("/orders/:restaurant_id", (req, res) => {
  // Get orders data for this restaurant id and pass to template
  let result = DataHelpers.getOrders();
  result.then((value) => {
    console.log(value)
    const orderData = value;
    const templateData = {
      order: orderData
    }

    res.render("orders", templateData);
  });
});

app.use('/orders/:restaurant_id/order-received', (req, res) => {
  // * Restaurant received order via SMS
  const twilioNumber = '+17784004460';
  const restaurantNumber     = '+12504155392';

  client.messages.create({
    body: 'You have a new order restaurant owner',
    to: restaurantNumber,  // Text this number
    from: twilioNumber// From a valid Twilio number
  })
  .then((message) => console.log(message.sid));
})

app.use('/orders/:restaurant_id/order-estimate', (req, res) => {
  // * Restaurant sets an estimate for how long the order will take and this sms will fire a txt to the client with the estimate time

  // Maybe an algorithm that decides how long it will take
  // Sends txt to client with estimate time
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});


/**
 * ~ Passport Authentication
 */

// ~ Where I left off: http://www.passportjs.org/packages/passport-local/ . The passport strategy requires a verify callback.

var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;

// ? The passport configs are running on mongo
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));
passport.use(new LocalStrategy(
  function(username, password, done) {
    const user = {username:'nick',password:'password'}
    return done(null, user)
  }
));

app.post('/demo',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
