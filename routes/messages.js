"use strict";

const express = require('express');
const router = express.Router();

module.exports = ({ getMessages, sendMessage }) => {
  router.get("/json/", (req, res) => {
    getMessages()
      .then(messages => {
        res.json({ messages });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/", (req, res) => {
    res.render("messages");
  });

  // router.post("/", (req, res) => {
  //   console.log("req.body:", req.body);
  //   const { sender_id, receiver_id, message } = req.body;
  //   sendMessage(sender_id, receiver_id, message)
  //     .then(message => {
  //       console.log("post message:", message);
  //       res.json(message);
  //       // res.redirect("/messages");
  //     }).catch(err => {
  //       console.log(err);
  //     });
  // });









  return router;
};
