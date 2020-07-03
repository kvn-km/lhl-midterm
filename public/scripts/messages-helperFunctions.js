// helper functions

// const getMessages = () => {
//   return $.get("/messagesRoute")
//     .then(data => {
//       const messages = data;
//       console.log("#############", messages);

//       return messages;
//     })
//     .catch(error => { console.log("JSON GET Fail", error); });
// };

// const sendAMessage = (data) => {
//   return $.post("/messagesRoute", data)
//     .then(returning => { return returning.rows; }
//     );
// };

// const createMessage = (message) => {
//   let $msg_container = $("<article>");
//   let $msg_message = $("<p>");
//   $msg_container.addClass("a_msg");
//   $msg_message.addClass("message.sender_id");
//   $msg_message.text(message["message"]);
//   $msg_container // <article class="a_msg">
//     .append($msg_message); // <p>
//   return $msg_container;
// };

// const renderConvo = (message) => {
//   for (const msg of message) {
//     $("#all_messages").prepend(createMessage(msg.message));
//   }
// };
// // };
