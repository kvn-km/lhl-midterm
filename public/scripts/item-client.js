"use strict";

$(document).ready(() => {
  console.log("Yo. Doc's Ready!");
  // goto individual item
  $(".ahref").click(function() {
    const itemID = $(this).attr("id");
    window.location.href = `/item/${itemID}/`;
  });

  // buy item
  $(".item-buy").submit(function() {
    const itemID = $(".item-header").attr("id");
    window.location.href = `/item/${itemID}/buy/`;
  });

  // favorites
  $(".item-fav").submit(function() {
    const itemID = $(".item-header").attr("id");
    window.location.href = `/item/${itemID}/fav/`;
  });
  $(".item-unfav").submit(function() {
    const itemID = $(".item-header").attr("id");
    window.location.href = `/item/${itemID}/unfav/`;
  });

  // activate
  $(".item-activate").submit(function() {
    const itemID = $(".item-header").attr("id");
    window.location.href = `/item/${itemID}/activate/`;
  });
  $(".item-deactivate").submit(function() {
    const itemID = $(".item-header").attr("id");
    window.location.href = `/item/${itemID}/deactivate/`;
  });

  $(".item-delete").submit(function() {
    const itemID = $(".item-header").attr("id");
    window.location.href = `/item/${itemID}/delete/`;
  });



  // message
  // $(".msg-seller").submit(function() {
  //   const itemID = $(".item-header").attr("id");
  //   window.location.href = `/item/${itemID}/messages/`;
  // });



});
