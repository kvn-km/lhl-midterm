"use strict";

const express = require('express');
const app = express();
const router = express.Router();
const path = require("path");

const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ["roar-roar", "like-a-dungeon-dragon"]
}));

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
    // login stuff changed from login.js
    req.session.userID = 3;
    req.session.username = "kevinKim";
    console.log("user_id:", req.session.userID);
    console.log("username:", req.session.username);

    res.sendFile(path.join(__dirname + "/messages.html"));
  });

  return router;
};
