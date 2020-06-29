const express = require('express');
const { database } = require('pg/lib/defaults');
const poolFactory = require('pg/lib/pool-factory');
const router  = express.Router();
// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();


module.exports = (db) => {
  router.get("/seaarch/new", (req, res) => {

    db.query(`SELECT * FROM items;`)
      .then(data => {

      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });
}
