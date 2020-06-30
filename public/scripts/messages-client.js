"use strict";

$(document).ready(() => {
  console.log("Yo. Doc's Ready!");
  // grab cookie info (logged in user)
  const user_id = '@Request.RequestContext.HttpContext.Session["f080ac7b-b838-4c5f-a1f4-b0a9fee10130"]';

  $("#send_message").submit(function() {
    event.preventDefault();
    // let theMessage = $("#message").val();
    let theMessageSerialized = $(this).serialize();
    sendAMessage(theMessageSerialized)
      .then(function() {
        getMessages()
          .then(function(messages) {
            $("#message").val("");
            $("#all_messages").empty();
            renderConvo(messages, user_id);
          });
      }).catch(error => { console.log("POST Message Fail", error); });
  });

  getMessages()
    .then(messages => {
      renderConvo(messages, user_id);
    })
    .catch(error => { console.log("Initial GET Fail", error); });
});
