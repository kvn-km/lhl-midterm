// helper functions


const getMessages = () => {
  return $.get("/messagesRoute");
};

// const sendMessage = (sender_id, receiver_id, message) => {
const sendMessage = (message) => {
  // const { sender_id, receiver_id, message } = req.body;
  const { Pool } = require('pg');
  const dbParams = require('../../lib/db.js');
  const db = new Pool(dbParams);
  db.connect();
  const sender = 3;
  const receiver = 1;
  const theMSG = message;
  const sendQuery = {
    text: `INSERT INTO messages(sender_id, receiver_id, message, timestamp) VALUES ($1, $2, $3, NOW()) RETURNING *;`,
    values: [sender, receiver, theMSG]
  };

  db.query(`SELECT username FROM users WHERE id = ${sender};`)
    .then(data => {
      console.log(data.rows[0]["username"]); // kevinKim
    });

  db.query(sendQuery)
    .then(returning => { return returning; });


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
