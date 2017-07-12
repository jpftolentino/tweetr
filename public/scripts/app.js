/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function renderTweets(data) {

  // console.log(data[i]);
  // loops through tweets
  for( var i = 0; i < data.length; i++){

    // console.log(data.length);
    // console.log(i);
    // console.log(data[i]);

    // calls createTweetElement for each tweet
    var $tweetContainer = createContainer(data[i]);
    // var $tweetfHeader = createfHeader(data[i]);
    var $tweetAvatar = createAvatar(data[i]);
    var $tweetName = createName(data[i]);
    var $tweetHandle = createHandle(data[i]);
    var $tweet = createTweet(data[i]);
    var $tweetDate = createDate(data[i]);

    // takes return value and appends it to the tweets container
    $('main').append($tweetContainer);
    // $('.following').append($tweetfHeader);
    $('.following').append($tweetAvatar); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    $('.following').append($tweetName);
    $('.following').append($tweetHandle);
    $('.following').append($tweet);
    $('.following').append($tweetDate);
  }
}

function createContainer(tweetData) {
  var $tweetContainer = $('<section>').addClass('following');
  return $tweetContainer;
}

// function createfHeader (tweetData) {
//   var $tweetfHeader = $("<span></span>").addClass('fheader');
//   return $tweetfHeader;
// }

function createAvatar (tweetData) {
  let tweetAvatar = tweetData['user']['avatars']['small'];
  var $tweetAvatar = $('<img src=' + tweetAvatar + '>').addClass('avatar');
  return $tweetAvatar;
}

function createName (tweetData) {
  console.log(tweetData);
  let tweetName = tweetData['user']['name'];
  var $tweetName = $('<div>' + tweetName + '</div>').addClass('name');
  return $tweetName;
}

function createHandle (tweetData) {
  let tweetHandle = tweetData['user']['handle'];
  var $tweetHandle = $('<div>' + tweetHandle + '</div>').addClass('handle');
  return $tweetHandle;
}

function createTweet (tweetData) {
  let tweetContent = tweetData['content']['text'];
  var $tweet = $("<article>" + tweetContent + '</article>').addClass("tweet");
  return $tweet;
}

function createDate (tweetData) {
  let tweetDate = tweetData['created_at'];
  var $tweetDate = $("<footer>" + tweetDate + '<span class=\'icons\'><i class=\"fa fa-flag\"></i><i class=\"fa fa-retweet\"></i><i class=\"fa fa-heart\"></i></span>' + "</footer>");
  return $tweetDate;
}

function iconHighlight(){
  $('main section footer .icons').show();
  // $('section.following').opacity(0.5);
}

function iconHide(){
  $('main section footer .icons').hide();
}

$( document ).ready(function() {
  console.log('Testing to see if app.js is being invoked');

  $('section .following').on('mouseover', iconHighlight);
  $('section .following').on('mouseout', iconHide);
  // Test / driver code (temporary)
  renderTweets(data);

});

