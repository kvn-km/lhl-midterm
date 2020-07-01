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
    const username = req.session.username;
    let templateVars = { user: req.session.username, user_id: req.session.userID };
    res.render("messages", templateVars);
  });




  return router;
};
