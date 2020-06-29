"use strict";

const express = require('express');
const app = express();
const router = express.Router();
const path = require("path");

module.exports = (db) => {
  router.get("/json/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const messages = data.rows;
        res.json({ messages });
      })
      .catch(error => { console.log("JSON GET Fail", error); });
  });

  router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/messages.html"));
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
