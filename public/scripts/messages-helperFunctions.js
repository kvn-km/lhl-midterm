// helper functions

const getMessages = () => {
  return $.get("/messagesRoute")
    .then(data => {
      const messages = data;
      return messages;
    })
    .catch(error => { console.log("JSON GET Fail", error); });
};

const sendAMessage = (data) => {
  return $.post("/messagesRoute", data)
    .then(returning => { return returning.rows; }
    );
};

function createMessage(message) {
  // fetch dates
  // let dateCreatedAt = msg.created_at;
  // let dateRightNow = Date.now();
  // let dateCreatedAgo = dateRightNow - dateCreatedAt;
  // generate elements
  let $msg_container = $("<article>");
  let $msg_message = $("<p>");
  // class assignment
  $msg_container.addClass("a_msg");
  // add content to the elements
  $msg_message.text(message["message"]);
  //build the elements
  $msg_container // <article class="a_msg">
    .append($msg_message); // <p>
  return $msg_container;
}

const renderConvo = (allMessages) => {
  for (const msg of allMessages) {
    $("#all_messages").append(createMessage(msg));
  }
};
