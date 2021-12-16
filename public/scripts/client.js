$('.scroll').click(() => {
  $('html,body').animate({ scrollTop: 0 }, 1000);
  $('#tweet-text').focus();
});

const createTweetElement = function(tweetObj) {
  const $tweet = $("<article class='tweet'>");
  const $header = $("<header class='th-header'>");
  const $headerD1 = $("<div class='name-left'>");
  const $avatar = $("<img>").attr("src", tweetObj.user.avatars);
  const $name = $("<h3>").text(tweetObj.user.name);
  $headerD1.append($avatar, $name);
  const $headerD2 = $("<div id='userID'>");
  const $handle = $("<p>").text(tweetObj.user.handle);
  $headerD2.append($handle);
  $header.append($headerD1, $headerD2);
  const $contentContainer = $("<div class='display-tweet'>");
  const $contentText = $("<p>").text(tweetObj.content.text);
  $contentContainer.append($contentText);
  const $footer = $("<footer>");
  const timeDelta = moment(tweetObj.created_at).fromNow();
  const $timeStamp = $("<p>").text(timeDelta);
  const $footerD2 = $("<div class='icons'>");
  const $flag = $("<i class='far fa-flag' id='flag'>");
  const $retweet = $("<i class='fas fa-retweet' id='retweet'>");
  const $heart = $("<i class='far fa-heart' id='heart'>");
  $footerD2.append($flag, $retweet, $heart);
  $footer.append($timeStamp, $footerD2);
  $tweet.append($header, $contentContainer, $footer);
  return $tweet;
};

//loops all tweets
const renderTweets = function(tweets) {
  const $container = $('#tweets-container');
  $container.empty();
  tweets.forEach((tweet) => {
    const tweetNode = createTweetElement(tweet);
    $container.prepend(tweetNode);
  });
};

const loadTweets = () => {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: 'json',
    success: (tweets) => {
      renderTweets(tweets);
    },
    error: (error) => {
      console.error(error);
    }
  });
};

const appendError = (message) => {
  $('#submit-tweet').prepend($("<span class='error'>").text(' ⚠️ ' + message + ' ⚠️').slideDown().delay(3500).hide(500));
};

const removeError = () => {
  $('.error').remove();
};

const resetCounter = () => {
  $('.counter').text(140);
};

$(document).ready(function() {
  loadTweets();
  
  //submit
  const $submitTweet = $('#submit-tweet');
  $submitTweet.on('submit', function(e) {
    e.preventDefault();
    const serializedData = $(this).serialize();
    
    //errors
    removeError();
    if ($('#tweet-text').val() === '' || null) {
      appendError("Your tweet is empty!");
    } else if ($('#tweet-text').val().length > 140) {
      appendError("Ooops !!! Too many characters");
    } else {
      
      //tweets post
      $.post('/tweets', serializedData)
        .then((response) => {
          loadTweets();
          $(this).children('textarea').val('');
          resetCounter();
        });
    }
  });
});
