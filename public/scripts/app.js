
 //creates an instance of each tweet inside mongodb database
function renderTweets(tweets) {
  for(var i in tweets){
    let renderTweets = createTweetElement(tweets[i])
    $('section').after(renderTweets);
  }
}

//loads tweet into html page
function loadTweets(){
  $.ajax({
    url: '/tweets',
    type: 'GET'
  }).then(function (jsonContent) {
    renderTweets(jsonContent);
  });
}

//Shows how old tweets are from current date
function parseDate(tweetDate){

  console.log(tweetDate);

  //Unix time is in milliseconds, convert to seconds
  let dateInSeconds = tweetDate/1000;
  let date = "";

  if(dateInSeconds < 60){
    if(dateInSeconds > 1){
      date = (dateInSeconds + " seconds ago");
    } else {
      date = (dateInSeconds + " second ago");
    }
  } else if (dateInSeconds >= 60 && dateInSeconds < 3600){
    let dateInMinutes = Math.round(dateInSeconds/60);
    if( dateInMinutes > 1 ){
      date = (dateInMinutes + " minutes ago");
    } else {
     date = (dateInMinutes + " minute ago");
    }
  } else if (dateInSeconds >= 3600 && dateInSeconds < 86400){
    let dateInHours = Math.round(dateInSeconds/3600);
    if( dateInHours > 1){
      date = (dateInHours + " hours ago");
    } else {
      date = (dateInHours + " hour ago");
    }
  } else if (dateInSeconds >= 86400 && dateInSeconds < 604800){
    let dateInDays = Math.round(dateInSeconds/86400);
    if( dateInDays > 1){
      date = (dateInDays + " days ago");
    } else {
      date = (dateInDays + " day ago");
    }
  } else if (dateInSeconds >= 604800 && dateInSeconds < 31449600){
    let dateInWeeks = Math.round(dateInSeconds/604800);
    if(dateInWeeks > 1){
      date = (dateInWeeks + " weeks ago");
    } else {
      date = (dateInWeeks + " week ago");
    }
  } else if (dateInSeconds >= 31449600){
    let dateInYears = Math.round(dateInSeconds/31449600);
    if(dateInYears > 1){
      date = (dateInYears + " years ago");
    } else {
      date = (dateInYears + " year ago");
    }
  }

  console.log(date);
  return date;
}

//Builds tweet structure for html page
function createTweetElement(tweets){

  let tweetAvatar = tweets['user']['avatars']['small'];
  let tweetName = tweets['user']['name'];
  let tweetHandle = tweets['user']['handle'];
  let tweetContent = tweets['content']['text'];

  let tweetDate = tweets['created_at'];
  tweetDate = Date.now() - tweetDate;
  tweetDate = parseDate(tweetDate);

  var $tweetAvatar = $('<img src=' + tweetAvatar + '>').addClass('avatar');
  var $tweetName = $('<div>' + tweetName + '</div>').addClass('name');
  var $tweetHandle = $('<div>' + tweetHandle + '</div>').addClass('handle');
  var $tweetContent = $("<article>").addClass("tweet").text(tweetContent);
  var $tweetDate = $("<footer>" + tweetDate + "</footer>");
  var $tweetConsHolder = $("<span>");
  var $tweetIconsFlag = $("<i>").addClass("fa fa-flag");
  var $tweetIconsRetweet = $("<i>").addClass("fa fa-retweet");
  var $tweetIconsHeart = $("<i>").addClass("fa fa-heart").text('Likes:');
  $tweetIconsHeart.attr('id','tweetId');
  $tweetIconsHeart.attr('data-num-likes','0');

  var footer = $tweetDate.append($tweetIconsHeart, $tweetIconsRetweet, $tweetIconsFlag);
  var $tweets = $('<article>').addClass('following').append($tweetAvatar, $tweetName, $tweetHandle, $tweetContent, footer);

  return $tweets;
}

//toggles tweet area
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

//Prevent user from tweeting more than 140 words or null
function tweetAsUser(){

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

}

//Once all functionality is loaded execute
$( document ).ready(function() {
  loadTweets();
  $('button').on('click', toggleTweet);
  tweetAsUser();

});
