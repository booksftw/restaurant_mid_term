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

const bookshelf = require('bookshelf')(knex);

var MenuItem = bookshelf.Model.extend({
  tableName: 'menus'
})

var MenuItem = bookshelf.Model.extend({
  tableName: 'menu_items',
  menu: function(){
    return this.belongsTo(Menu)
  },
  dish: function(){
    return this.belongsTo(Dish)
  }
});

var Order = bookshelf.Model.extend({
  tableName: 'orders',
  menuItems: function() {
    return this.hasMany(MenuItems);
  }
});

var Restaurant = bookshelf.Model.extend({
  tableName: 'restaurants',
  menus: function(){
    return this.hasMany(Menus);
  }
});

var Menu = bookshelf.Model.extend({
  tableName: 'menus',
  menuItems: function() {
    return this.hasMany(MenuItem);
  },
  restraunt: function(){
    return this.belongsTo(Restaurant);
  }
});

Menu.collection().fetch().then(collection =>{
  console.log(collection.first().menuItems().first())
})





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

    getDishes: function() {
        return knex.select('*').from('dishes')
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
        'order_id',
        'orders.name',
        'orders.phone',
        'dishes.id as dish_id',
        'dishes.name as dish_name',
        'line_items.qty as dish_qty',
        'orders.notes',
        'orders.created_at',
        'orders.received_at',
        'orders.completed_at',
        'orders.pickup_at',
        'orders.restaurant_id'
      ).from('line_items').as('order')
      .join('orders', 'order_id', '=', 'orders.id')
      .join('dishes', 'menu_item_id', '=', 'dishes.id')
      .orderBy('order_id')
      .then(function (rest){
          if(rest.length > 0){
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
