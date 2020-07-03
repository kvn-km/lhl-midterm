// main json and initial get route for messages

"use strict";

const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const help = require("../public/scripts/item-helper");
// const jess = require("../public/scripts/messages-client");

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
        const contacts = {
          "seller_id": templateVars.item.seller_id,
          "user_id": req.session.user_id
        };
        templateVars["contacts"] = contacts;
        getMessages(db, contacts, templateVars.item.id)
          .then(messages => {
            let jsonMSG = JSON.stringify(messages.rows);
            let jsonPMSG = JSON.parse(jsonMSG);
            templateVars["messages"] = jsonPMSG;
            res.render("messages", templateVars);
          });
      });
  });

  router.get("/:item_id", (req, res) => {
    console.log("user_id:", req.session.user_id);
    console.log("username:", req.session.username);
    const cookies = { username: req.session.username, user_id: req.session.user_id };
    let templateVars = {};
    help.createVarsSingle(db, cookies, req)
      .then((data) => {
        templateVars = data;
        const contacts = {
          "seller_id": templateVars.item.seller_id,
          "user_id": req.session.user_id
        };
        templateVars["contacts"] = contacts;
        getMessages(db, contacts, templateVars.item.id)
          .then(messages => {
            let jsonMSG = JSON.stringify(messages.rows);
            let jsonPMSG = JSON.parse(jsonMSG);
            templateVars["messages"] = jsonPMSG;
            res.render("messages", templateVars);
          });
      });
  });

  router.post("/:item_id", (req, res) => {
    const cookies = { username: req.session.username, user_id: req.session.user_id };
    let templateVars = {};
    help.createVarsSingle(db, cookies, req)
      .then((data) => {
        templateVars = data;
        const contacts = {
          "seller_id": templateVars.item.seller_id,
          "user_id": req.session.user_id
        };
        templateVars["contacts"] = contacts;
        const theMessage = req.body.morevariables.message;
        help.sendMessagToSeller(db, req.body.morevariables.contacts, req.body.morevariables.item_id, theMessage)
          .then(() => {
            getMessages(db, req.body.morevariables.contacts, req.params.item_id)
              .then((messages) => {
                //
                let jsonMSG = JSON.stringify(messages.rows);
                let jsonPMSG = JSON.parse(jsonMSG);
                templateVars["messages"] = jsonPMSG;

                console.log("the message is:", messages.rows);

                return res.send(messages);
              });
          });
      });
  });




















  const getMessages = (db, contacts, item_id) => {
    const query = {
      text: `SELECT * FROM messages WHERE item_id = $3 AND ((sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)) ORDER BY id ASC;`,
      values: [contacts.user_id, contacts.seller_id, item_id]
    };
    return db.query(query)
      .catch(error => { console.log("MESSAGES GET Fail", error); });
  };




  return router;
};
