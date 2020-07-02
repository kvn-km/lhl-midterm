// main json and initial get route for messages

"use strict";

const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const help = require("../public/scripts/item-helper");

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
    console.log("user_id:", req.session.user_id);
    console.log("username:", req.session.username);
    const cookies = { username: req.session.username, user_id: req.session.user_id };
    let templateVars = {};
    help.createVarsSingle(db, cookies, req)
      .then((data) => {
        templateVars = data;
        res.render("item", templateVars);
      });
    res.render("messages", templateVars);
  });







  return router;
};
