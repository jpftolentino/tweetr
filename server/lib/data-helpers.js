"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection('tweetr').insertOne(newTweet);
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection('tweetr').find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }

        // console.log(tweets);
        callback(null, tweets);
      });
    },

    // get all users in db
    // getUsers: function(callback) {
    //   db.collection('users').find().toArray((err, users) => {
    //     if (err) {
    //       return callback(err);
    //     }

    //     callback(null, users);
    //   });
    // }




  };
}
