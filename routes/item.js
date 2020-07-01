// main json and initial get route for messages

"use strict";

const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


const help = require("../public/scripts/item-helper");
console.log("itemHelper:", help);

module.exports = (db) => {

  router.get("/json/", (req, res) => {
    help.fetchAllItems(db)
      .then(data => res.json(data.rows));
  });

  router.get("/", (req, res) => {
    console.log("user_id:", req.session.user_id);
    console.log("username:", req.session.username);
    const cookies = { username: req.session.username, user_id: req.session.user_id };
    const item = [];
    help.fetchAllActiveItems(db)
      .then(data => {
        item.push(data.rows);
        let templateVars = { anItem: false, user: cookies, helper: help, item: item[0], counter: 0 };
        res.render("item", templateVars);
      });
  });

  router.get("/:item_id", (req, res) => {
    console.log("user_id:", req.session.user_id);
    console.log("username:", req.session.username);
    const cookies = { username: req.session.username, user_id: req.session.user_id };
    const item_id = req.params.item_id;
    const item = [];
    help.fetchItemFromID(db, item_id)
      .then(data => {
        item.push(data.rows[0]);
        let templateVars = { anItem: true, user: cookies, helper: help, item: item[0], counter: 0 };
        res.render("item", templateVars);
      });
  });

  router.post("/:item_id/buy", (req, res) => {
    console.log("user_id:", req.session.user_id);
    console.log("username:", req.session.username);
    const cookies = { username: req.session.username, user_id: req.session.user_id };
    const user_id = req.session.user_id;
    const item_id = req.params.item_id;
    const item = [];
    help.buyItem(db, item_id, user_id)
      .then(() => {
        help.fetchAllItems(db)
          .then(data => {
            item.push(data.rows[0]);
            let templateVars = { anItem: false, user: cookies, helper: help, item: item[0], counter: 0 };
            // res.redirect("user", templateVars);
            res.redirect("/item");
          });
      });

  });



  return router;
};


// const user_id = req.session.user_id;
// const username = req.session.username;

// can add to ejs
//   <% help.fetchAllItems() %>


// for (let thing of item) {
//   thing.title
// }
