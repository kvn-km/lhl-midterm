"use strict";

const express = require('express');
const app = express();
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const $ = require("../public/vendor/jquery-3.0.0");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ["roar-roar", "like-a-dungeon-dragon"]
}));

module.exports = (db, sendMessage) => {
  router.get("/json/", (req, res) => {
    db.query(`SELECT * FROM messages;`)
      .then(data => {
        const messages = data.rows;
        res.json({ messages });
      })
      .catch(error => { console.log("JSON GET Fail", error); });
  });

  router.get("/", (req, res) => {
    req.session.userID = 3; // testing w user id 3
    req.session.username = "kevinKim"; // testing w my username
    console.log("user_id:", req.session.userID);
    console.log("username:", req.session.username);
    res.sendFile(path.join(__dirname + "/messages.html"));
  });

  return router;
};
