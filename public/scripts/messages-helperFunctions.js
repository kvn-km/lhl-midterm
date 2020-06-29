// helper functions

// module.exports = (db) => {

const getMessages = (db) => {
  return $.get("/messages/json");
};

const sendMessage = (sender_id, receiver_id, message) => {
  const sender = sender_id;
  const receiver = receiver_id;
  const theMSG = message;
  const sendQuery = {
    text: `INSERT INTO messages(sender_id, receiver_id, message, timestamp) VALUES ($1, $2, $3, NOW()) RETURNING *;`,
    values: [sender, receiver, theMSG]
  };
  return db
    .query(sendQuery)
    .then(returning => returning.rows);
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
    .append($msg_msg); // <p>

  return $msg_container;
}

const renderConvo = () => {
  for (const message of getMessages) {
    $("#all_messages").append(createMessage(message));
  };
};

// return {
//   getMessages,
//   sendMessage,
//   createMessage,
//   renderConvo
// };
// };
//
