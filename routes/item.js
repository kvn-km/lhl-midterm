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
  //json
  router.get("/json/", (req, res) => {
    help.fetchAllItems(db)
      .then(data => res.json(data.rows));
  });

  // root items (all products)
  router.get("/", (req, res) => {
    console.log("user_id:", req.session.user_id);
    console.log("username:", req.session.username);
    const cookies = { username: req.session.username, user_id: req.session.user_id };
    let templateVars = {};
    help.createVarsMulti(db, cookies, req)
      .then((data2) => {
        templateVars = data2;
        res.render("item", templateVars);
      });
  });

  // individual item
  router.get("/:item_id", (req, res) => {
    console.log("user_id:", req.session.user_id);
    console.log("username:", req.session.username);
    const cookies = { username: req.session.username, user_id: req.session.user_id };
    let templateVars = {};
    help.createVarsSingle(db, cookies, req)
      .then((data) => {
        templateVars = data;
        res.render("item", templateVars);
      });
  });

  // purchase item
  router.post("/:item_id/buy", (req, res) => {
    console.log("user_id:", req.session.user_id);
    console.log("username:", req.session.username);
    const cookies = { username: req.session.username, user_id: req.session.user_id };
    const user_id = req.session.user_id;
    const item_id = req.params.item_id;
    let templateVars = {};
    help.buyItem(db, item_id, user_id)
      .then(() => {
        help.createVarsMulti(db, cookies, req)
          .then((data2) => {
            templateVars = data2;
            res.redirect("back");
          });
      });
  });

  // sold item
  router.post("/:item_id/sold", (req, res) => {
    console.log("user_id:", req.session.user_id);
    console.log("username:", req.session.username);
    const cookies = { username: req.session.username, user_id: req.session.user_id };
    const user_id = req.session.user_id;
    const item_id = req.params.item_id;
    let templateVars = {};
    help.soldItem(db, item_id, user_id)
      .then(() => {
        help.createVarsMulti(db, cookies, req)
          .then((data2) => {
            templateVars = data2;
            res.redirect("../../user");
          });
      });
  });

  // favourite
  router.post("/:item_id/unfav", (req, res) => {
    console.log("user_id:", req.session.user_id);
    console.log("username:", req.session.username);
    const cookies = { username: req.session.username, user_id: req.session.user_id };
    const user_id = req.session.user_id;
    const item_id = req.params.item_id;
    let myFavouritesIds = [];
    let theItem = [];
    let templateVars = {};
    help.unFavItem(db, item_id, user_id)
      .then(() => {
        help.fetchUserFavItems(db, cookies)
          .then((data1) => {
            let theFavs = data1.rows;
            for (let favs of theFavs) {
              myFavouritesIds.push(favs.item_id);
            }
            templateVars["favouritesIds"] = myFavouritesIds;
            help.fetchAllUserItems(db, cookies)
              .then(data2 => {
                for (let row of data2.rows) {
                  theItem.push(row);
                }
                templateVars["item"] = theItem;
                res.redirect("../../user");
              });
          });
      });
  });
  router.post("/:item_id/fav", (req, res) => {
    console.log("user_id:", req.session.user_id);
    console.log("username:", req.session.username);
    const cookies = { username: req.session.username, user_id: req.session.user_id };
    const user_id = req.session.user_id;
    const item_id = req.params.item_id;
    let myFavouritesIds = [];
    let theItem = [];
    let templateVars = {};
    help.favItem(db, item_id, user_id)
      .then(() => {
        help.fetchUserFavItems(db, cookies)
          .then((data1) => {
            let theFavs = data1.rows;
            for (let favs of theFavs) {
              myFavouritesIds.push(favs.item_id);
            }
            templateVars["favouritesIds"] = myFavouritesIds;
            help.fetchAllUserItems(db, cookies)
              .then(data2 => {
                for (let row of data2.rows) {
                  theItem.push(row);
                }
                templateVars["item"] = theItem;
                res.redirect("../../user");
              });
          });
      });
  });

  // activation
  router.post("/:item_id/activate", (req, res) => {
    console.log("user_id:", req.session.user_id);
    console.log("username:", req.session.username);
    const cookies = { username: req.session.username, user_id: req.session.user_id };
    const user_id = req.session.user_id;
    const item_id = req.params.item_id;
    let myFavouritesIds = [];
    let theItem = [];
    let templateVars = {};
    help.activateItem(db, item_id, user_id)
      .then(() => {
        help.fetchUserFavItems(db, cookies)
          .then((data1) => {
            let theFavs = data1.rows;
            for (let favs of theFavs) {
              myFavouritesIds.push(favs.item_id);
            }
            templateVars["favouritesIds"] = myFavouritesIds;
            help.fetchAllUserItems(db, cookies)
              .then(data2 => {
                for (let row of data2.rows) {
                  theItem.push(row);
                }
                templateVars["item"] = theItem;
                res.redirect("back");
              });
          });
      });
  });
  router.post("/:item_id/deactivate", (req, res) => {
    console.log("user_id:", req.session.user_id);
    console.log("username:", req.session.username);
    const cookies = { username: req.session.username, user_id: req.session.user_id };
    const user_id = req.session.user_id;
    const item_id = req.params.item_id;
    let myFavouritesIds = [];
    let theItem = [];
    let templateVars = {};
    help.deactivateItem(db, item_id, user_id)
      .then(() => {
        help.fetchUserFavItems(db, cookies)
          .then((data1) => {
            let theFavs = data1.rows;
            for (let favs of theFavs) {
              myFavouritesIds.push(favs.item_id);
            }
            templateVars["favouritesIds"] = myFavouritesIds;
            help.fetchAllUserItems(db, cookies)
              .then(data2 => {
                for (let row of data2.rows) {
                  theItem.push(row);
                }
                templateVars["item"] = theItem;
                res.redirect("back");
              });
          });
      });
  });

  // messages
  router.get("/:item_id/messages", (req, res) => {
    console.log("user_id:", req.session.user_id);
    console.log("username:", req.session.username);
    const cookies = { username: req.session.username, user_id: req.session.user_id };
    const user_id = req.session.user_id;
    const item_id = req.params.item_id;
    let templateVars = {};
    help.createVarsMulti(db, cookies, req)
      .then((data2) => {
        templateVars = data2;
        res.redirect("../../messages");
      });
  });

  const deleteItemById = (itemId) => {
    return db.query(
      `DELETE FROM items
            WHERE items.id= $1;`,
      [itemId]
    );
  };

  router.post("/:id/delete", (req, res) => {
    const userId = req.session["user_id"];
    const username = req.session["username"];
    const itemId = req.params.id;
    deleteItemById(itemId).then(() => res.redirect(`/user`));
  });





  return router;
};
