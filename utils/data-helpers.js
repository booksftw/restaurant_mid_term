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


            // return knex.select('*').from('restaurants').asCallback(function(err, rows) {
            //     if (err) return console.error(err);
            //     // console.log(rows, 'restraunts rows');
            //     console.log(rows[0], 'row 0')
            //     const testDataFromDb = rows[0];
            //     return testDataFromDb;
            // });
        }
    };
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
  
 
 