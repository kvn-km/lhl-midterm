<<<<<<< HEAD
"use strict";

const express = require('express');
const app = express();
const router = express.Router();

const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ["roar-roar", "like-a-dungeon-dragon"]
}));

module.exports = (db) => {
  // let templateVars = {
  //   loggedIn: true,
  //   userID: req.session.userID,
  //   username: req.session.username,
  // };
  // res.send("hello");

  router.get("/json", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        // res.render("login");
        res.json({ users });
      })
      .catch(error => { console.log("JSON GET Fail", error); });
  });

  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.render("login");
      })
      .catch(error => { console.log("LOGIN GET Fail", error); });
  });

  router.post("/", (req, res) => {
    console.log("req.body:", req.body);
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        const userUsernames = [];
        const user_ids = [];
        for (let user of users) {
          userUsernames.push(user["username"]);
          user_id.push(user["user_id"]);
        }
        if (user["username"] === req.body.loginInfo) {
          req.session.userID = user_ids.indexOf(user["user_id"]);
          req.session.username = req.body.loginInfo;
        }
        const templateVars = {
          loggedIn: true,
          user_id: req.session.userID,
          username: req.session.username
        };
        res.render("/login", templateVars);
      })
      .catch(error => { console.log("JSON GET Fail", error); });


    // const theUsersID = fetchUserKeysFromLoginInfo(req.body.loginInfo);
    // const theUsernames = fetchUsernames();

    // // login with correct email
    // if (theUserEmails.includes(req.body.loginInfo) && bcrypt.compareSync(password, userDatabase[theUsersKey]["password"])) {
    //   req.session.userID = theUsersKey;
    //   req.session.username = userDatabase[theUsersKey]["username"];
    //   req.session.email = userDatabase[theUsersKey]["email"];
    //   req.session.password = userDatabase[theUsersKey]["password"];
    //   res.redirect("/urls");
    //   // login with correct username
    // } else if (theUsernames.includes(req.body.loginInfo) && bcrypt.compareSync(password, userDatabase[theUsersKey]["password"])) {
    //   req.session.userID = theUsersKey;
    //   req.session.username = userDatabase[theUsersKey]["username"];
    //   req.session.email = userDatabase[theUsersKey]["email"];
    //   req.session.password = userDatabase[theUsersKey]["password"];
    //   res.redirect("/urls");
    // } else { // wrong info
    //   let templateVars = {
    //     loginPage: true,
    //     validationCheck: false,
    //     username: req.session.username,
    //     email: req.session.email
    //   };
    // res.status(403).render("login", templateVars);
    // }
  });





=======
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //get the user object with its username
  const getUserByUsername = (username) => {
    return db
      .query(`SELECT * FROM users WHERE username LIKE $1;`, [username])
      .then((data) => {
        return data.rows[0];
      })
      .catch((err) => console.error("query error", err.stack));
  };
  //Renders the login form
  router.get("/", (req, res) => {
    const username = req.session["username"];
    console.log("username:", username);
    let templateVars = { user: username };
    res.render("login", templateVars);
  });
  //Sets the cookie when login in
  router.post("/", (req, res) => {
    const username = req.body.username;
    getUserByUsername(username).then((user) => {
      req.session["user_id"] = user["id"];
      req.session["username"] = user["username"];
      console.log("req.session:", req.session);
      res.redirect(`/`);
    });
  });
>>>>>>> master
  return router;
};
