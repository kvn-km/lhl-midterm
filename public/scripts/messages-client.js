"use strict";

$(document).ready(() => {
  console.log("Yo. MSG Doc's Ready!");

  // works
  const theMSGVar = JSON.parse($('#variablesMsg').text());
  const theContactsVar = JSON.parse($('#variablesContacts').text());
  const theItemVar = JSON.parse($('#variablesItem').text());
  $('#variableContacts').remove();
  $('#variableMsg').remove();
  $('#variableItem').remove();


  //works
  const createMessage = (message) => {
    let $msg_container = $("<article>");
    let $msg_message = $("<p>");
    $msg_container.addClass("a_msg");
    $msg_message.addClass(`${message.sender_id}`);
    $msg_message.text(`${message.message}`);
    $msg_container // <article class="a_msg">
      .append($msg_message); // <p>
    return $msg_container;
  };

  // works
  const renderConvo = (message) => {
    for (const msg of message) {
      $("#all_messages").prepend(createMessage(msg));
    }
  };





  $("#send_message").submit(function() {
    event.preventDefault();
    const contacts = {
      "seller_id": theContactsVar.seller_id,
      "user_id": theContactsVar.user_id
    };
    let morevariables = {
      item_id: theItemVar.id, message: $("#message").val(), contacts: contacts
    };
    return $.post(`/messages/${theItemVar.id}`, { morevariables })
      .then((messages) => {
        renderConvo(messages.rows);
      });
  });









  // works
  renderConvo(theMSGVar);

});
