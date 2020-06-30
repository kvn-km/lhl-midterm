// main json and initial get route for messages

"use strict";

const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = (db) => {
  router.get("/json/", (req, res) => {
    db.query(`SELECT * FROM items;`)
      .then(data => {
        const allItems = data.rows;
        res.json({ allItems });
      })
      .catch(error => { console.log("JSON GET Fail", error); });
  });

  router.get("/", (req, res) => {
    console.log("user_id:", req.session.user_id);
    console.log("username:", req.session.username);
    const user_id = req.session.user_id;
    const username = req.session.username;
    const cookies = { user: req.session.username, user_id: req.session.user_id };
    let templateVars = { cookies };
    res.render("item", templateVars);
  });

  return router;
};
