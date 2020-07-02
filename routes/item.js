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
    help.fetchAllItems(db)
      .then(data => res.json(data.rows));
  });

  router.get("/", (req, res) => {
    console.log("user_id:", req.session.user_id);
    console.log("username:", req.session.username);
    const cookies = { username: req.session.username, user_id: req.session.user_id };
    const item = [];
    const favouritesIds = [];
    help.fetchAllActiveItems(db)
      .then(data => {
        item.push(data.rows);
        help.fetchUserFavItems(db, cookies)
          .then(data => {
            favouritesIds.push(data.rows[0]);
            let templateVars = { anItem: false, user: cookies, helper: help, item: item[0], favouritesIds: favouritesIds[0] };
            res.render("item", templateVars);
          });
      });
  });

  router.get("/:item_id", (req, res) => {
    console.log("user_id:", req.session.user_id);
    console.log("username:", req.session.username);
    const cookies = { username: req.session.username, user_id: req.session.user_id };
    const item_id = req.params.item_id;
    const item = [];
    const favouritesIds = [];
    help.fetchItemFromID(db, item_id)
      .then(data => {
        item.push(data.rows[0]);
        help.fetchUserFavItems(db, cookies)
          .then(data => {
            favouritesIds.push(data.rows[0]);
            let templateVars = { anItem: true, user: cookies, helper: help, item: item[0], favouritesIds: favouritesIds[0] };
            res.render("item", templateVars);
          });
      });
  });



  router.post("/:item_id/buy", (req, res) => {
    console.log("user_id:", req.session.user_id);
    console.log("username:", req.session.username);
    const cookies = { username: req.session.username, user_id: req.session.user_id };
    const user_id = req.session.user_id;
    const item_id = req.params.item_id;
    const item = [];
    const myFavouritesIds = [];
    const types = [];
    const myFeaturedItems = [];
    help.buyItem(db, item_id, user_id)
      .then(() => {
        help.fetchAllActiveItems(db)
          .then(data => {
            item.push(data.rows);
            help.fetchItemTypes(db)
              .then(data => {
                let theTypes = data.rows;
                for (let aType of theTypes) { types.push(aType.type); }
                help.fetchUserFavItems(db, cookies)
                  .then(data => {
                    myFavouritesIds.push(data.rows[0]);
                    help.fetchFeaturedItems(db)
                      .then((data) => {
                        let features = data.rows;
                        myFeaturedItems.push(features);
                        let templateVars = {
                          user: cookies,
                          item: item[0],
                          types: types,
                          favouritesIds: myFavouritesIds[0],
                          featuredItems: myFeaturedItems
                        };
                        res.redirect("/");
                      });
                  });
              });
          });
      });
  });

  return router;
};
