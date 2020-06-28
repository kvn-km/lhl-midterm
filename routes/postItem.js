const express = require('express');
const { database } = require('pg/lib/defaults');
const poolFactory = require('pg/lib/pool-factory');
const router  = express.Router();
// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();



const addNewItem = (item) => {
  const query = {
    text: `INSERT INTO items (seller_id, title, price, photo, description, type, is_featured)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    values: [`${item.seller_id}`, `${item.title}`, `${item.price}`, `${item.photo}`, `${item.description}`, `${item.type}`,`${item.featured}`]
  }

  return db.query(query).then((res) => res.rows);

}



module.exports = (db) => {
  router.get("/new", (req, res) => {
    res.render("post_items")
  });

  router.post("/new", (req, res) => {
    // const userId = req.session.userId;
    addNewItem({...req.body, seller_id: 1})
      .then(item => {
        res.redirect("/items");
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  })
  return router;
};
