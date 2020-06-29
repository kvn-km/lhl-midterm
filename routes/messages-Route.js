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




  return router;
};
