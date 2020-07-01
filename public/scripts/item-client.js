"use strict";

$(document).ready(() => {
  console.log("Yo. Doc's Ready!");

  $(".ahref").click(function() {
    const itemID = $(this).attr("id");
    window.location.href = `/item/${itemID}/`;
  });

  $(".item-buy").submit(function() {
    const itemID = $(this).attr("id");
    window.location.href = `/item/${itemID}/buy/`;
  });


});
