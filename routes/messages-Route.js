// async get and post routes for messages

"use strict";

const express = require('express');
const router = express.Router();

const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

module.exports = () => {

  router.get("/", (req, res) => {
    db.query(`SELECT * FROM messages;`)
      .then(data => {
        const messages = data.rows;
        res.send(messages);
      })
      .catch(error => { console.log("JSON GET Fail", error); });
  });

  router.post("/", (req, res) => {
    console.log("the cookies are:", req.session);
    console.log("the message is:", req.body.message);
    const theMSG = req.body.message;
    const sender = req.session.userID;
    const receiver = 1; // needs to be updated
    const sendQuery = {
      text: `INSERT INTO messages(sender_id, receiver_id, message, timestamp)
      VALUES ($1, $2, $3, NOW()) RETURNING *;`,
      values: [sender, receiver, theMSG]
    };
    db.query(sendQuery)
      .then(returning => {
        const theReturn = returning.rows;
        res.send(theReturn);
      });
  });

  return router;
};

