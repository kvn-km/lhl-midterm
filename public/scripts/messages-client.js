"use strict";
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  $(document).ready(() => {
    console.log("Yo. Doc's Ready!");

    router.post("/messages/new", (req, res) => {

      console.log(req.body);

      db.query(`
        INSERT INTO messages (sender_id, receiver_id, message, timestamp)
        VALUES (15, 13,
        'I didn''t say it, I declared it.',
        '2015-11-02 24:00:00')
        RETURNING *;
        `).then(data => {
        const msgs = data.rows;

        //          res.send("hello");
      })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });

    return router;
  });
};




  // // REF: 1. Make sure textarea is hidden at start
  // $(".new_tweet").toggleClass("visible");

  // // bring me back to the top of the page when clicking the logo
  // $(".logo").click(function() {
  //   $(window).scrollTop(0);
  // });

  // // REF: 1. Compose tweet un/hide feature
  // $(".tagline").click(function() {
  //   if ($(".new_tweet").hasClass("visible")) {
  //     $(".new_tweet").animate({ "margin-top": "-9rem", "opacity": "0" });
  //     $(".new_tweet").toggleClass("visible");
  //     $("#tweet_text").blur();
  //   } else {
  //     $(".new_tweet").animate({ "margin-top": "0rem", "opacity": "100" });
  //     $(".new_tweet").toggleClass("visible");
  //     $("#tweet_text").focus();
  //   }
  // });

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

  // // page load get tweets
  // getTweets()
  //   .then(response => { renderTweets(response, "#all_tweets"); })
  //   .catch(error => { console.log("Initial GET Fail", error); });

  // // REF: 2. if error was thrown, remove it when the textarea is being adjusted
  // $("[id=tweet_text]").on("input", function() {
  //   $("[class=errorMSG]").animate({ "margin-left": "15rem", "opacity": "0" });
  // });

