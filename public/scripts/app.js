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

function renderTweets(tweets) {
  for(var i in tweets){
    let renderTweets = createTweetElement(tweets[i])
    $('section').after(renderTweets);
  }
}

function loadTweets(){
  $.ajax({
    url: '/tweets',
    type: 'GET'
  }).then(function (jsonContent) {
    renderTweets(jsonContent);
  });
}

function createTweetElement(tweets){

  let tweetAvatar = tweets['user']['avatars']['small'];
  let tweetName = tweets['user']['name'];
  let tweetHandle = tweets['user']['handle'];
  let tweetContent = tweets['content']['text'];
  let tweetDate = tweets['created_at'];

  var $tweetAvatar = $('<img src=' + tweetAvatar + '>').addClass('avatar');
  var $tweetName = $('<div>' + tweetName + '</div>').addClass('name');
  var $tweetHandle = $('<div>' + tweetHandle + '</div>').addClass('handle');
  var $tweetContent = $("<article>").addClass("tweet").text(tweetContent);
  var $tweetDate = $("<footer>" + tweetDate + "</footer>");
  var $tweetConsHolder = $("<span>");
  var $tweetIconsFlag = $("<i>").addClass("fa fa-flag");
  var $tweetIconsRetweet = $("<i>").addClass("fa fa-retweet");
  var $tweetIconsHeart = $("<i>").addClass("fa fa-heart");

  var footer = $tweetDate.append($tweetIconsHeart, $tweetIconsRetweet, $tweetIconsFlag);
  var $tweets = $('<article>').addClass('following').append($tweetAvatar, $tweetName, $tweetHandle, $tweetContent, footer);

  return $tweets;
}


//ADD HOVER TO CSS!!!

function iconHighlight(){
  $('main section footer .icons').show();
  // $('section.following').opacity(0.5);
}

function iconHide(){
  $('main section footer .icons').hide();
}

function toggleTweet(){
  let goFocus = ($('.new-tweet').is(':visible'));

  if(!goFocus){
    $('.new-tweet').slideToggle(900);
    $('textarea').focus();
  } else {
    $('.new-tweet').slideToggle(900);
    $('textarea').blur();
  }

}

$( document ).ready(function() {
  console.log('Testing to see if app.js is being invoked');

  $('section .following').on('mouseover', iconHighlight);
  $('section .following').on('mouseout', iconHide);

  loadTweets();

  $('form').on('submit', function (event) {
      event.preventDefault();

      let textCount =  $('textarea').val().length;
      if(textCount === 0){
        alert('Cannot Tweet empty field!');
      } else if ( textCount > 140){
        alert('Sorry! Your Tweet is too long!');
      } else if (textCount === null){
        alert('Sorry illegal Tweet!');
      } else {
        $.ajax({
          method: 'POST',
          url: '/tweets',
          data: $(this).serialize()
        }).then(function (){
          $('.following').remove();
          loadTweets();
          $('textarea').val('');
          $('.counter').text('');
          $('.counter').text(140);
        });
      }
  });

  $('button').on('click', toggleTweet);
  // renderTweets(data);
});
