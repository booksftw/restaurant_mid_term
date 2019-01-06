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

// * Cookie sessions
const cookieSession = require('cookie-session')

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

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
// app.use("/api/users", usersRoutes(knex)); Not sure if this does anything i'm commenting it out for now nz

// TODO ~ UPDATE / ROUTE TO REDIRECT TO LOGIN
// TODO ~ Add logout btn
// TODO REDIRECT LOGGED IN USERS BY THEIR USER STORY OR 404



/**
 * ~ Custom Route Guards
* Todo: Another improvement is to make the restr owner only able to visit his own restraunts
 */
app.get('*' , (req,res,next) => {
  const role = req.session.user ? req.session.user.role : null //req.session == null ? null  : req.session.user.role
  const url = req.url

  // * Guard URL by cookie role
  if (role == 'customer') {
    // customer routes
    url.includes('shop') || url =='/' || url.includes('/login')  ? console.log('customer null ALLOWED') : res.redirect('/login?404=true')//res.redirect('/404')//console.log('/shop customer 404 redirect FORBIDDEN')//res.redirect('/login')
  } else if (role == 'owner') {
    // owner routes
    url.includes('orders') || url == '/' || url.includes('login') ? console.log('owner null ALLOWED') : res.redirect('/login?404=true')//console.log('/orders owner 404 redirect FORBIDDEN') //res.redirect('/login')
  } else if( !role ) {
    // No cookie and not on login already
    console.log('NULL role')
    url == '/login' ? console.log('Not logged in user ALLOWED') : res.redirect('/login')
    // res.redirect('/login')
  }
  next()
})

/**
 * ~ Custom Authentication
 */
function validateUser(req, res, username, password) {

  async function redirectToPageByRole(user) {
    const restaurants = await DataHelpers.getRestaurant(false);
    const {role} = user

    role === 'customer' ? res.redirect('/shop') : null
    role === 'owner'    ? res.redirect('/orders/1') : null // * Make it get the first restaurant owner id later and

  }

  //check server and validate
  function grantUserAccess(user){
    console.log('granting you access')
      // Create cookie session
      const {email, password, role} = user
      req.session.user = {email:email, pass: password, role:role}
      redirectToPageByRole(user)
  }

  function rejectUserAccess(){
    console.log('you ve been rejected')
    res.redirect('/login?error=true')
  }

  (async function asyncFunc() {
    const users = await DataHelpers.getUsers()
      const matchedUser = users.filter( usr => {
        return usr.email == username && usr.password == password
      })
      matchedUser.length > 0 ? grantUserAccess(matchedUser[0]) : rejectUserAccess()
  })()

}

app.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  validateUser(req ,res, username, password); // * Validates and Redirects
})

app.get('/login', (req, res) => {
  const hasError = req.query.error ? req.query.error : false // ex: /login?error=true
  const has404   = req.query[404] ? req.query[404] : false
  res.render('login', { error: hasError, msg_404: has404 })
})

/**
 *  ~ How to Get Data from DB?
 *  A sample playground for you.
 *
 *  Demo Page
 */
app.get("/demo", (req, res) => {
  // * Promise.all returns a single array with all the data.
  // * We can handle that array with the .then operator.
  let demoData = Promise.all(
    [
      DataHelpers.getRestaurant(true),
      DataHelpers.getMenus(true),
      DataHelpers.getItems(),
    ]
  ).then(
    (val) => {
      // ? val[0] - restaurant, val[1] - menus, val[2] - dishes
      const templateData = {
        restr: val[0],
        menus: val[1],
        items: val[2],
        test: 'Happy New Year'
      }
      res.render('get-data-sample', templateData);
    }
  )

});

app.get('/', (req, res) => {
  res.send('I updated this route to /shop to support authentication and user stories based on their acess rights.  -NZ')
  res.end()
})

// Home page - Restaurant Listing
app.get("/shop", (req, res) => {

  (async function(){

    const shops = await DataHelpers.getRestaurant(false)
    // console.log('restr data', shops)
    const templateVars = { restrs: shops }
    res.render('shop_listing', templateVars)
  })()
});

// Restaurant Menu
app.get("/shop/:restaurant_id", (req, res) => {
  const rest_id = Number(req.params.restaurant_id);
  let result = DataHelpers.getRestaurant();

  result.then((value) => {
    // console.log(value, 'val')
  let demoData = Promise.all(
    [
      // ! Restaurants and Menus returning only the first key
      DataHelpers.getRestaurant(),
      DataHelpers.getMenus(),
      DataHelpers.getItems(),
    ]
  ).then(
    (val) => {
      const allRestaurants = val[0]
      // console.log(val[0], 'restraunt')
      // console.log(val[1], 'menus')
      // console.log(val[2], 'dishes')

      console.log(rest_id, 'rest_id', typeof(rest_id) )

      const currRestr = allRestaurants.filter( (restr) => {
          console.log(restr.id, rest_id, 'INSIDE CURR REST FILTER')
        return restr.id === rest_id;
      })
      console.log(currRestr, 'currRestr')

      const templateData = {
        restr: currRestr[0],
        menus: val[1],
        dishes: val[2],
      }
      res.render('index', templateData);

    }
  )


  });
});

// Orders page
app.get("/orders", (req, res) => {
  // Get orders data for this restaurant id and pass to template
  let result = DataHelpers.getOrders();
  result.then((value) => {
    res.json(value);
  });
});

app.post("/orders/:order_id/received", (req, res) => {
  console.log('Received!', req.params.order_id);
  DataHelpers.receiveOrder(req.params.order_id);
});

app.post("/orders/:order_id/completed", (req, res) => {
  DataHelpers.completeOrder(req.params.order_id);
});

app.post("/orders/:order_id/closed", (req, res) => {
  DataHelpers.closeOrder(req.params.order_id);
});

app.get("/orders/:restaurant_id", (req, res) => {
  // Get orders data for this restaurant id and pass to template
  let result = DataHelpers.getOrders();
  result.then((value) => {

    const orderData = value;
    const templateData = {
      order: orderData,
      restId: req.params.restaurant_id
    }
    console.log(templateData.order[1].item)
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


