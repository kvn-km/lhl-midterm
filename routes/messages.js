"use strict";

const express = require('express');
const router = express.Router();
const path = require("path");

module.exports = (db) => {
  router.get("/json/", (req, res) => {
    db.query(`SELECT * FROM messages;`)
      .then(data => {
        const messages = data.rows;
        res.json({ messages });
      })
      .catch(error => { console.log("JSON GET Fail", error); });
  });

  router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/messages.html"));
  });

  return router;
};
