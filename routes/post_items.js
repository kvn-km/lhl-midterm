const express = require('express');
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


module.exports = (db) => {
  router.get("/new", (req, res) => {

    db.query(`SELECT * FROM items;`)
      .then(data => {
        const items = data.rows;
        const types = typeList(items);
        const username = req.session["username"]
        const templateVar = { types: types, user: username }
        res.render("post_items", templateVar)
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  router.post("/new", (req, res) => {
    const userId = req.session["user_id"];

    addNewItem({...req.body, seller_id: userId})
      .then(item => {
        const itemId = item[0].id;
        res.redirect(`/item/${itemId}`)
      })
      .catch(e => {
        console.error(e);
        res.status(500).send(e)
      });
  })


  return router;
};
