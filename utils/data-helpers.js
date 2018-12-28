"use strict";

/**
 * ~ In progress: Set up querys to give entire table in one query or figure out how to give the data and use in template together.
 */


var knex = require('knex')({
    client: 'pg',
    connection: {
    //   host : settings.hostname,
      user : 'labber',
      password : 'labber',
      database : 'midterm'
    }
  });

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = {
    // ~ Curently only returning the first restaurant
    getRestaurant: function() {

        return knex.select('*').from('restaurants')
            .then(function (rest){
            if(rest.length>0){
                return Promise.resolve(rest[0])
            } else {
                return Promise.resolve(0)
            }

        });
    },

    // ~ Currently only returning the first menu
    getMenus: function() {

        return knex.select('*').from('menus')
        .then(function (rest){
            if(rest.length>0){
                return Promise.resolve(rest[0])
            } else {
                return Promise.resolve(0)
            }
        });
    },

    getDishes: function() {
        return knex.select('*').from('dishes')
        .then(function (rest){
            if(rest.length>0){
                return Promise.resolve(rest)
            } else {
                return Promise.resolve(0)
            }
        });
    },

    getOrders: function() {
      return knex.select('*').from('line_items').as('order')
      .join('orders', 'order_id', '=', 'orders.id')
      .join('dishes', 'menu_item_id', '=', 'dishes.id')
      .then(function (rest){
          if(rest.length>0){
              return Promise.resolve(rest)
          } else {
              return Promise.resolve(0)
          }
      });
    }

}






    //   // Saves a tweet to `db`
    //   saveTweet: function(newTweet, callback) {
    //     db.collection('tweets').insertOne(newTweet);
    //     callback(null, true)
    //   },

    //   // Guess at replacement
    //   getTweets: function (callback) {
    //     db.collection('tweets').find().toArray(function(err, docs) {
    //       callback(null, docs)
    //     })
    //   }
