"use strict";

const express = require('express');
const router = express.Router();

const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

module.exports = () => {

  router.get("/", (req, res) => {
    return db.query(`SELECT * FROM messages;`)
      .then(data => {
        const messages = data.rows;
        res.send(messages);
      })
      .catch(error => { console.log("JSON GET Fail", error); });
  });

  // router.post("/", (req, res) => {
  //   const { sender_id, receiver_id, message } = req.body;
  //   const sender = 3;
  //   const receiver = 1;
  //   const theMSG = message;
  //   const sendQuery = {
  //     text: `INSERT INTO messages(sender_id, receiver_id, message, timestamp) VALUES ($1, $2, $3, NOW()) RETURNING *;`,
  //     values: [sender, receiver, theMSG]
  //   };
  //   db.query(`SELECT username FROM users WHERE id = ${sender};`)
  //     .then(data => {
  //       console.log(data.rows[0]["username"]); // kevinKim
  //     });
  //   return db
  //     .query(sendQuery)
  //     .then(returning => returning.rows);
  // });


  return router;
};
