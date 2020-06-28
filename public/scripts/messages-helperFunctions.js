// helper functions

function getTweets() {
  return $.get("/tweets");
}

function createTweet(tweet) {
  // fetch dates
  let dateCreatedAt = tweet.created_at;
  let dateRightNow = Date.now();
  let dateCreatedAgo = dateRightNow - dateCreatedAt;
  // generate elements
  let $tweet_container = $("<article>");
  let $tweet_profileContainer = $("<header>");
  let $tweet_profilePic = $("<span>");
  let $tweet_profileIMG = $("<img>");
  let $tweet_profileName = $("<h3>");
  let $tweet_profileSocialName = $("<span>");
  let $tweet_profileUsername = $("<h4>");
  let $tweet_tweet = $("<p>");
  let $tweet_divider = $("<hr>");
  let $tweet_infoContainer = $("<footer>");
  let $tweet_datePosted = $("<span>");
  let $tweet_socialIcons = $("<span>");
  let $tweet_iconFlag = $("<i>");
  let $tweet_iconRetweet = $("<i>");
  let $tweet_iconHeart = $("<i>");
  // class assignment
  $tweet_container.addClass("a_tweet");
  $tweet_profilePic.addClass("profile_pic");
  $tweet_profileSocialName.addClass("profile_name");
  $tweet_datePosted.addClass("date_posted");
  $tweet_socialIcons.addClass("social_icons");
  $tweet_iconFlag.addClass("icons fas fa-flag");
  $tweet_iconRetweet.addClass("icons fas fa-reply");
  $tweet_iconHeart.addClass("icons fas fa-heart");
  // additional attributes where necessary
  $tweet_profileIMG.attr({ "src": tweet.user.avatars, "width": "50", "height": "50" });
  // add content to the elements
  $tweet_profileName.text(tweet.user.name);
  $tweet_profileUsername.text(tweet.user.handle);
  $tweet_tweet.text(tweet.content.text);
  $tweet_datePosted.text(dateConverter3000(dateCreatedAgo));

  //build the elements
  $tweet_container // <article class="a_tweet">
    .append($tweet_profileContainer // <header>
      .append($tweet_profilePic // <span class="profile_pic">
        .append($tweet_profileIMG) // <img>
        .append($tweet_profileName) // <h3>
      )
      .append($tweet_profileSocialName // <span class="profile_name">
        .append($tweet_profileUsername) // <h4>
      )
    )
    .append($tweet_tweet) // <p>
    .append($tweet_divider) // <hr>
    .append($tweet_infoContainer // <footer>
      .append($tweet_datePosted) // <span class="date_posted">
      .append($tweet_socialIcons // <span class="social_icons">
        .append($tweet_iconFlag) // <i>
        .append($tweet_iconRetweet) // <i>
        .append($tweet_iconHeart) // <i>
      )
    );
  return $tweet_container;
}

const renderTweets = (tweetsDB, targetElement) => {
  for (const tweet of tweetsDB) {
    $(targetElement).prepend(createTweet(tweet));
  };
};

