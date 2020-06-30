"use strict";

$(document).ready(() => {
  console.log("Yo. Doc's Ready!");

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
            renderConvo(messages);
          });
      }).catch(error => { console.log("POST Message Fail", error); });
  });

  getMessages()
    .then(messages => {
      renderConvo(messages);
    })
    .catch(error => { console.log("Initial GET Fail", error); });
});
