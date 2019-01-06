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

const NestHydrationJS = require('nesthydrationjs')();


// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = {
    // ~ Curently only returning the first restaurant
    getRestaurant: function(onlyFirstRest, restaurant_id) {
        let query = knex.select('*').from('restaurants')
        if(restaurant_id){
          query = query.where('restaurants.id', '=', restaurant_id)
        }
        return query.then(function (rest){
            if(onlyFirstRest){
              console.log(rest[0]);
                return rest[0]
            } else {
                return rest
            }
        });
    },

    // ~ Currently only returning the first menu
    getMenus: function(onlyFirstMenu, restaurant_id) {
        let query =  knex.select('*').from('menus')
        if(restaurant_id){
          query = query.where('restaurant_id', '=', restaurant_id)
        }
        return query.then(function (rest){
            if(onlyFirstMenu){
                return rest[0]
            } else {
                return rest
            }
        });
    },

    getItems: function(onlyFirstMenu, restaurant_id) {
        let query =  knex.select('*').from('items')
        if(restaurant_id){
          query = query.where('restaurant_id', '=', restaurant_id)
        }
        return query.then(function (rest){
            if(rest.length > 0){
                return rest
            } else {
                return 0
            }
        });
    },

    getOrders: function() {
      return knex.select(
        'orders.id as _id',
        'orders.name as _name',
        'orders.phone as _phone',
        'orders.notes as _notes',
        'orders.created_at as _createdAt',
        'orders.received_at as _receivedAt',
        'orders.completed_at as _completedAt',
        'orders.pickup_at as _pickupAt',
        'orders.restaurant_id as _restaurantId',
        'order_items.id as _item__id',
        'items.name as _item__name',
        'order_items.qty as _item__qty',
      ).from('orders').as('order')
      .join('order_items', 'orders.id', '=', 'order_items.order_id')
      .join('items', 'items.id', '=', 'order_items.item_id')
      .orderBy('orders.id')
      .then(NestHydrationJS.nest)
    },


    getUsers: function() {
        return knex.select( 'email','password','role')
        .from('users').then(function(users){
            return Promise.resolve(users);
        })

    },

    receiveOrder: function (orderId) {
      return knex('orders').where('id', '=', orderId).update( {'received_at':  knex.fn.now() } ).then( () => {} ).return();
    },

    completeOrder: function (orderId) {
      return knex('orders').where('id', '=', orderId).update( {'completed_at':  knex.fn.now() } ).then( () => {} ).return();
    },

    closeOrder: function (orderId) {
      return knex('orders').where('id', '=', orderId).update( {'pickup_at':  knex.fn.now() } ).then( () => {} ).return();
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
