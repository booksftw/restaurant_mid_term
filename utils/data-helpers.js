"use strict";

/**
 * ~ In progress: Set up querys to give entire table in one query or figure out how to give the data and use in template together.
 */


const knex = require('knex')({
  client: 'pg',
  connection: {
  //   host : settings.hostname,
    user : 'labber',
    password : 'labber',
    database : 'midterm'
  }
});

var NestHydrationJS = require('nesthydrationjs')();


// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = {
    // ~ Curently only returning the first restaurant
    getRestaurant: function() {

        return knex.select('*').from('restaurants')
            .then(function (rest){
            if(rest.length > 0){
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
            if(rest.length > 0){
                return Promise.resolve(rest[0])
            } else {
                return Promise.resolve(0)
            }
        });
    },

    getitems: function() {
        return knex.select('*').from('items')
        .then(function (rest){
            if(rest.length > 0){
                return Promise.resolve(rest)
            } else {
                return Promise.resolve(0)
            }
        });
    },

    getOrders: function(restId) {
      return knex.select(
        'orders.id as _id',
        'orders.name as _name',
        'orders.phone as _phone',
        'items.name as _item__name',
        'order_items.qty as _item__qty',
        'items.id as _item_id__NUMBER',
        'orders.notes as _notes',
        'orders.created_at as _createdAt',
        'orders.received_at as _receivedAt',
        'orders.completed_at as _completedAt',
        'orders.pickup_at as _pickupAt',
        'orders.restaurant_id as _restaurantId'
      ).from('orders').as('order')
      .join('order_items', 'orders.id', '=', 'order_id')
      .join('items', 'items.id', '=', 'item_id')
      .orderBy('orders.id')
      .then(NestHydrationJS.nest)

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
