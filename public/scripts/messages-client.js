"use strict";

$(document).ready(() => {
  console.log("Yo. Doc's Ready!");

  // $("form").submit(function() {
  //   event.preventDefault();
  //   let tweetTextSample = $("#tweet_text").val();
  //   if (tweetTextSample.length > 140 || tweetTextSample.length === 0) { // REF: 2. Throw error if tweet is too long.
  //     $("[class=errorMSG]").animate({ "margin-left": "0rem", "opacity": "100" });
  //   } else if (tweetTextSample.length > 0 && tweetTextSample.length <= 140) {
  //     let theTweet = $(this).serialize();
  //     $.post("/tweets/", theTweet)
  //       .then(
  //         function() {
  //           getTweets()
  //             .then((tweets) => {
  //               $("#tweet_text").val(""); // clear the text field
  //               $(".counter").val("140"); // reset counter
  //               $("#all_tweets").empty(); // clear the current tweet container
  //               renderTweets(tweets, "#all_tweets"); // re-render tweets
  //             });
  //         },
  //         function(err) { // if errors, throw errors
  //           console.error("POST FAIL", error);
  //         }
  //       );
  //   }
  // });

  // // REF: 2. if error was thrown, remove it when the textarea is being adjusted
  // $("[id=tweet_text]").on("input", function() {
  //   $("[class=errorMSG]").animate({ "margin-left": "15rem", "opacity": "0" });
  // });



  getMessages()
    .then(messages => { renderConvo(messages); })
    .catch(error => { console.log("Initial GET Fail", error); });
});
