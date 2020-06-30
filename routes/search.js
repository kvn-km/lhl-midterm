const express = require('express');
const { database } = require('pg/lib/defaults');
const poolFactory = require('pg/lib/pool-factory');
const router  = express.Router();
// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

const typeList = (db) => {
  const type = {};
  for(let item of db ) {
    if (!type[item.type]) {
      type[item.type] = 1
    } else {
      type[item.type]++;
    }
  }
  return type;
}

const searchItems = function(options) {
  const queryParams = [];
  let queryString = `
  SELECT * FROM items
  `;

  if(options.search) {
    queryParams.push(`%${options.search}%`);
    queryString += `WHERE title LIKE $${queryParams.length}`;
  }

}

module.exports = (db) => {
  router.get("/new", (req, res) => {

    db.query(`SELECT * FROM items;`)
      .then(data => {
        const items = data.rows;
        const types = typeList(items);
        const templateVar = { types: types }
        res.render("search", templateVar)
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });


  router.post("/new", (req, res) => {
    searchItems({...req.body})
      .then(options => {
        res.json(options);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  })
  return router;
}
