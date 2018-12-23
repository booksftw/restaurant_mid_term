"use strict";

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
  
 
 