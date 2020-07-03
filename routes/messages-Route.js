// async get and post routes for messages

"use strict";

const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const help = require("../public/scripts/item-helper");

module.exports = (db) => {

  // router.get("/", (req, res) => {
  //   db.query(`SELECT * FROM messages;`)
  //     .then(data => {
  //       const messages = data.rows;
  //       res.send(messages);
  //     })
  //     .catch(error => { console.log("JSON GET Fail", error); });
  // });

  // router.post("/", (req, res) => {
  //   console.log("the cookies are:", req.session);
  //   console.log("the message is:", req.body.message);
  //   console.log(req.body);

  //   const receiver = 1; // needs to be updated, for testing
  //   const sendQuery = {
  //     text: `INSERT INTO messages(item_id, sender_id, receiver_id, message, timestamp)
  //     VALUES ($1, $2, $3, $4, NOW()) RETURNING *;`,
  //     values: [ITEM_ID, req.session.userID, receiver, req.body.message]
  //   };
  //   db.query(sendQuery)
  //     .then(returning => {
  //       res.send(returning.rows);
  //     });
  // });












  return router;
};
